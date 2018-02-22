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
import logo from './images/orange.png';
import './App.css';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import FixedNav from './components/FixedNav';
import HomeSearchForm from './components/HomeSearchForm';
import RecipeInfo from './components/RecipeInfo';
import RecipeSave from './components/RecipeSave';
//////////////////////////////////////////////////LAI
import SavedRecipes from './components/SavedRecipes';
//////////////////////////////////////////////////LAI
import Results from './components/Results';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recipeData: null,
			isLoaded: null,
			moreInfo: [],
			signUpClicked: false,
			loginClicked: false,
			recipesUser: [],
			userId: 1		// hard-coded for testing...
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
		/////////////////////////////////////////////////////////////LAI
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
	getRecipesUserData(responseData) {
		this.setState({ recipesUser: responseData });
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
									/>
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
