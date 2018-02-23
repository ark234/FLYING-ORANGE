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

class App extends Component {
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
		this.getMoreInfoForRecipe = this.getMoreInfoForRecipe.bind(this);
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
				prevState.moreInfoRecipe=response.data;
				prevState.recId=recIdDB;
				prevState.extInfoSource=uri;
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
			data: {idUser}
		})
		.then(response => {
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
																	prevState.extInfoSource=recUri;
																	prevState.itemRecipeUser=recordData;
																	prevState.recId=recId;
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

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route
						exact
						path="/"
						render={props => {
							return (
								<HomeSearchForm
									{...props}
									toggleSignUp={this.toggleSignUp}
									toggleLogin={this.toggleLogin}
									getResponseData={this.getResponseData}
									errorForResponse={this.errorForResponse}
									errorFlag={this.state.error}
									loadingFlag={this.state.isLoaded}
									isLoaded={this.loading}
									loginClicked={this.state.loginClicked}
									signUpClicked={this.state.signUpClicked}
								/>
							);
						}}
					/>
					<Route
						exact
						path="/results"
						render={props => {
							return (
								<Results
									{...props}
									results={this.state.recipeData}
									moreInfo={this.getMoreInfoData}
									getResponseData={this.getResponseData}
									errorForResponse={this.errorForResponse}
									errorFlag={this.state.error}
									loadingFlag={this.state.isLoaded}
									isLoaded={this.loading}
									loginClicked={this.state.loginClicked}
									signUpClicked={this.state.signUpClicked}
									toggleLogin={this.toggleLogin}
									toggleSignUp={this.toggleSignUp}
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
									toggleLogin={this.toggleLogin}
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
									 getMoreInfoForRecipe={this.getMoreInfoForRecipe} />
							);
						}}
					/>
					{
						/////////////////////////////////////////////////////LAI
					}
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
