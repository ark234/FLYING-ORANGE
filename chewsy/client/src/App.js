/////////////////////////////////////////////////
//                                             //
//    Project CHEWSY                           //
//    Flying Orange Team at GA, New York       //
//    February, 2018                           //
//                                             //
//    Instructors:                             //
//        Tims Gardner                         //
//        Drake Tally                          //
//        Dominic Farquharson                  //
//                                             //
/////////////////////////////////////////////////
//                                             //
// This file is from client/src forlder...     //
//                                             //
/////////////////////////////////////////////////
// LAI: /recipes/save Route...           022018//
// LAI: /users/:id/savedRecipes...       022118//
//                                             //
/////////////////////////////////////////////////

import React, { Component } from 'react';
import axios from 'axios';
import logo from './images/orange.png';
import './App.css';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import FixedNav from './components/FixedNav';
import HomeSearchForm from './components/HomeSearchForm';
import RecipeInfo from './components/RecipeInfo';
import RecipeSave from './components/RecipeSave';
//////////////////////////////////////////////////LAI
import SavedRecipes from './components/SavedRecipes';
import MoreInfoRecipe from './components/MoreInfoRecipe';
//////////////////////////////////////////////////LAI
import Results from './components/Results';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import TokenService from './services/TokenService';
import UserProfile from './components/UserProfile';

class App extends Component {
	resetState() {
		this.setState({
			recipeData: null,
			savedRecipe: null,
			isLoaded: false,
			moreInfo: [],
			signUpClicked: false,
			loginClicked: false,
			recipesUser: [],
			userData: {},
			prefData: {},
			isLoggedIn: false,
			tokenData: {},
			navClicked: false
		});
	}

	constructor(props) {
		super(props);

		this.state = {
			recipeData: null,
			/////////////////////////////////////////////////LAI
			// savedRecipe: null,
			moreInfoRecipe: null,
			itemRecipeUser: null,
			extInfoSource: null,
			recipesUser: [],
			/////////////////////////////////////////////////LAI
			isLoaded: null,
			moreInfo: [],
			signUpClicked: false,
			loginClicked: false,
			recipesUser: [],
			userData: {},
			prefData: {},
			isLoggedIn: false,
			tokenData: {},
			navClicked: false,
			recId: null,
			userId: 1 // hard-coded for testing...
		};

		///////////////////////////////////////////////////////////////LAI
		// recipeData are from getResponseData - entire set from query;
		// moreInfo - is particular item in the set - related to
		// RecipeInfo.js...
		// recipesUser are from getRecipesUserData all records by user
		// from DB table "recipes_user"...
		// We are not saving user name in the DB "users" table...
		///////////////////////////////////////////////////////////////LAI

		this.getResponseData = this.getResponseData.bind(this);
		this.errorForResponse = this.errorForResponse.bind(this);
		this.loading = this.loading.bind(this);
		this.getMoreInfoData = this.getMoreInfoData.bind(this);
		this.toggleSignUp = this.toggleSignUp.bind(this);
		this.toggleLogin = this.toggleLogin.bind(this);
		/////////////////////////////////////////////////////////////LAI
		this.getRecipesUserData = this.getRecipesUserData.bind(this);
		this.getAllUserRecipes = this.getAllUserRecipes.bind(this);
		/////////////////////////////////////////////////////////////LAI
		// this.getSavedRecipe = this.getSavedRecipe.bind(this);
		this.routeToResults = this.routeToResults.bind(this);
		this.renderResults = this.renderResults.bind(this);
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.authClick = this.authClick.bind(this);
		this.checkLogin = this.checkLogin.bind(this);
		// this.toggleNav = this.toggleNav.bind(this);
		this.getMoreInfoForRecipe = this.getMoreInfoForRecipe.bind(this);
		this.editTokenData = this.editTokenData.bind(this);
	}

	checkLogin() {
		axios('http://localhost:8080/isLoggedIn', {
			headers: {
				Authorization: `Bearer ${TokenService.read()}`
			}
		})
			.then(resp => {
				console.log('checkLogin response:', resp.data);
				this.setState({ isLoggedIn: resp.data.isLoggedIn, tokenData: resp.data.tokenData });
			})
			.catch(err => console.log(err));
	}
	editTokenData(info){
		console.log('in editTokenData. info:', info);
		const newTokenData = {
				email: info.email,
				iat: info.iat,
				id: info.id
			};
		this.setState({tokenData: newTokenData});
	}

	getMoreInfoForRecipe(uri, recIdDB) {
		console.log('uri: ', uri);
		console.log('recId: ', recIdDB);
		axios({
			url: 'http://localhost:8080/recipes/moreInfo',
			method: 'post',
			data: { uri }
		}).then(response => {
			console.log('SAVED RECIPE DATA===>', response.data);
			/////////////////////////////////////////////////////////////LAI
			// Changing the name "savedRecipe" to ===> "moreInfoRecipe"
			this.setState(prevState => {
				prevState.moreInfoRecipe = response.data;
				prevState.recId = recIdDB;
				prevState.extInfoSource = uri;
				return prevState;
			});
			// this.setState({ savedRecipe: response.data });
			/////////////////////////////////////////////////////////////LAI
			// this.props.history.push('/moreInfo');
		});
	}

	getAllUserRecipes() {
		// Retrieve a set of user records from "recipes_user" tabel...

		const idUser = this.state.userId;

		console.log('User ID: ', idUser);

		axios({
			url: 'http://localhost:8080/users/:idUser/savedRecipes',
			method: 'get',
			data: { idUser }
		}).then(response => {
			console.log(
				'In SavedRecipes.queryRecipesUser: server responded. response.data: ',
				response.data
			);

			this.setState(prevState => {
				prevState.recipesUser = response.data;
				// prevState.userId = idUser;
				return prevState;
			});

			// this.props.getRecipesUserData(response.data);
		});
	}

	// api call for creating a new user
	// note that TokenService.save with the token is called
	// may also want to setState with the user data and
	// whether or not the user is logged in
	register(data) {
		axios('http://localhost:8080/users/register', {
			method: 'POST',
			data
		})
			.then(resp => {
				console.log('response token:', resp.data.token);
				TokenService.save(resp.data.token);
				console.log('user ====>', resp.data.user);
				this.setState({ userData: resp.data.user });
				console.log('prefs ====>', resp.data.prefs);
				this.setState({ prefData: resp.data.prefs });
				this.setState({ signUpClicked: false });
				this.checkLogin();
			})
			.catch(err => console.log(`err: ${err}`));
	}

	// same as above except route is login
	// as above, we are saving the token locally using
	// the TokenService
	login(data) {
		axios('http://localhost:8080/users/login', {
			method: 'POST',
			data
		})
			.then(resp => {
				console.log('response token:', resp.data.token);
				TokenService.save(resp.data.token);
				console.log('====>', resp.data.user);
				this.setState({ userData: resp.data.user });
				console.log('prefs ====>', resp.data.prefs);
				this.setState({ prefData: resp.data.prefs });
				this.setState({ loginClicked: false });
				this.checkLogin();
			})
			.catch(err => console.log(`err: ${err}`));
	}

	// calling a restricted route on the server
	// the important part is setting the Authorization header
	// with the token retrieved from the TokenService
	authClick(ev) {
		ev.preventDefault();
		axios('http://localhost:8080/restricted', {
			headers: {
				Authorization: `Bearer ${TokenService.read()}`
			}
		})
			.then(resp => console.log(resp))
			.catch(err => console.log(err));
	}

	// just delete the token
	logout() {
		this.resetState();
		TokenService.destroy();
	}

	toggleLogin() {
		this.setState(prevState => {
			prevState.loginClicked = !prevState.loginClicked;
			return prevState;
		});
	}
	toggleSignUp() {
		this.setState(prevState => {
			prevState.signUpClicked = !prevState.signUpClicked;
			return prevState;
		});
	}

	getResponseData(responseData) {
		console.log('grabbing data', responseData);
		this.setState({ recipeData: responseData, isLoaded: true });
	}

	getMoreInfoData(responseData) {
		this.setState({ moreInfo: responseData });
		console.log(this.state);
	}

	/////////////////////////////////////////////////LAI
	getRecipesUserData(recordData, recId, recUri) {
		this.setState(prevState => {
			prevState.extInfoSource = recUri;
			prevState.itemRecipeUser = recordData;
			prevState.recId = recId;
			return prevState;
		});
		console.log(this.state);
	}
	/////////////////////////////////////////////////LAI

	errorForResponse() {
		this.setState({ error: true });
	}
	loading() {
		this.setState({ isLoaded: false });
	}
	routeToResults() {
		this.props.history.push('/results');
	}
	renderResults(props) {
		if (this.state.recipeData === null) {
			return null;
		} else {
			return <Results {...props} results={this.state.recipeData} moreInfo={this.getMoreInfoData} />;
		}
	}

	componentDidMount() {
		this.checkLogin();
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<Header
						{...this.props}
						toggleSignUp={this.toggleSignUp}
						toggleLogin={this.toggleLogin}
						getResponseData={this.getResponseData}
						errorForResponse={this.errorForResponse}
						errorFlag={this.state.error}
						loadingFlag={this.state.isLoaded}
						isLoaded={this.loading}
						loginClicked={this.state.loginClicked}
						signUpClicked={this.state.signUpClicked}
						routeToResults={this.routeToResults}
						logout={this.logout}
						isLoggedIn={this.state.isLoggedIn}
						toggleNav={this.toggleNav}
						navClicked={this.state.navClicked}
					/>
					{this.state.loginClicked ? (
						<Login submit={this.login} toggleLogin={this.toggleLogin} />
					) : null}
					{this.state.signUpClicked ? (
						<Register submit={this.register} toggleSignUp={this.toggleSignUp} />
					) : null}
					<Switch>
						<Route
							exact
							path="/"
							render={props => {
								return this.renderResults(props);
							}}
						/>
						<Route
							exact
							path="/results"
							render={props => {
								return (
									<Results
										{...props}
										toggleSignUp={this.toggleSignUp}
										results={this.state.recipeData}
										moreInfo={this.getMoreInfoData}
									/>
								);
							}}
						/>
						<Route
							exact
							path="/moreInfo"
							render={props => {
								return (
									<RecipeInfo
										{...props}
										recipeDatum={this.state.moreInfo}
										results={this.state.recipeData}
										moreInfo={this.getMoreInfoData}
									/>
								);
							}}
						/>
						{
							/////////////////////////////////////////////////////LAI
						}
						<Route
							exact
							path="/users/:id/savedRecipes"
							render={props => {
								return (
									<SavedRecipes
										{...props}
										userId={this.state.userId}
										recipesUser={this.state.recipesUser}
										getRecipesUserData={this.getRecipesUserData}
										getMoreInfoForRecipe={this.getMoreInfoForRecipe}
										getAllUserRecipes={this.getAllUserRecipes}
									/>
								);
							}}
						/>
						<Route
							exact
							path="/users/:idUser/savedRecipes/:idRec"
							render={props => {
								return (
									<MoreInfoRecipe
										{...props}
										moreInfoRecipe={this.state.moreInfoRecipe}
										itemRecipeUser={this.state.itemRecipeUser}
										extInfoSource={this.state.extInfoSource}
										recId={this.state.recId}
										userId={this.state.userId}
										getMoreInfoForRecipe={this.getMoreInfoForRecipe}
									/>
								);
							}}
						/>
						{
							/////////////////////////////////////////////////////LAI
						}
						<Route
							exact
							path="/register"
							component={props => <Register {...props} submit={this.register} />}
						/>
						<Route
							exact
							path="/login"
							component={props => (
								<Login
									{...props}
									submit={this.login}
									authClick={this.authClick}
									logout={this.logout}
								/>
							)}
						/>
						<Route
							exact
							path="/profile"
							component={props => <UserProfile {...props} userId={this.state.tokenData.id}
							editTokenData={this.editTokenData} />}
						/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
