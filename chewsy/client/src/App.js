import React, { Component } from 'react';
import axios from 'axios';
import logo from './images/orange.png';
import './App.css';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import FixedNav from './components/FixedNav';
import HomeSearchForm from './components/HomeSearchForm';
import RecipeInfo from './components/RecipeInfo';
import Results from './components/Results';
import Register from './components/Register';
import Login from './components/Login';
import TokenService from './services/TokenService';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recipeData: null,
			isLoaded: null,
			moreInfo: [],
			signUpClicked: false,
			loginClicked: false
		};

		this.getResponseData = this.getResponseData.bind(this);
		this.errorForResponse = this.errorForResponse.bind(this);
		this.loading = this.loading.bind(this);
		this.getMoreInfoData = this.getMoreInfoData.bind(this);
		this.toggleSignUp = this.toggleSignUp.bind(this);
		this.toggleLogin = this.toggleLogin.bind(this);
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	// api call for creating a new user
	// note that TokenService.save with the token is called
	// may also want to setState with the user data and
	// whether or not the user is logged in
	register(data) {
		axios('http://localhost:3000/users/register', {
			method: 'POST',
			data
		})
			.then(resp => {
				TokenService.save(resp.data.token);
			})
			.catch(err => console.log(`err: ${err}`));
	}

	// same as above except route is login
	// as above, we are saving the token locally using
	// the TokenService
	login(data) {
		axios('http://localhost:3000/users/login', {
			method: 'POST',
			data
		})
			.then(resp => {
				TokenService.save(resp.data.token);
			})
			.catch(err => console.log(`err: ${err}`));
	}

	// calling a restricted route on the server
	// the important part is setting the Authorization header
	// with the token retrieved from the TokenService
	authClick(ev) {
		ev.preventDefault();
		axios('http://localhost:3000/restricted', {
			headers: {
				Authorization: `Bearer ${TokenService.read()}`
			}
		})
			.then(resp => console.log(resp))
			.catch(err => console.log(err));
	}

	// just delete the token
	logout(ev) {
		ev.preventDefault();
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
									toggleSignUp={this.toggleSignUp}
									results={this.state.recipeData}
									moreInfo={this.getMoreInfoData}
									getResponseData={this.getResponseData}
									errorForResponse={this.errorForResponse}
									errorFlag={this.state.error}
									loadingFlag={this.state.isLoaded}
									isLoaded={this.loading}
								/>
							);
						}}
					/>
					<Route
						exact
						path="/moreInfo"
						render={props => {
							return (
								<RecipeInfo toggleLogin={this.toggleLogin} recipeDatum={this.state.moreInfo} />
							);
						}}
					/>
					<Route
						exact
						path="/register"
						component={props => <Register {...props} submit={this.register.bind(this)} />}
					/>
					<Route
						exact
						path="/login"
						component={props => <Login {...props} submit={this.login.bind(this)} />}
					/>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
