<<<<<<< HEAD
import React, { Component } from "react";
import logo from "./orange.png";
import "./App.css";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import FixedNav from "./components/FixedNav";
import HomeSearchForm from "./components/HomeSearchForm";
import RecipeInfo from "./components/RecipeInfo";
import Results from "./components/Results";
=======
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
// This file is from client/src...             //
//                                             //
/////////////////////////////////////////////////

import React, { Component } from 'react';
import logo from './orange.png';
import './App.css';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import FixedNav from './components/FixedNav';
import HomeSearchForm from './components/HomeSearchForm';
import RecipeInfo from './components/RecipeInfo';
import Results from './components/Results';
import UsersLogin from './components/UsersLogin';
import UserLog from './components/UserLog';
import UserReg from './components/UserReg';
import axios from 'axios';
>>>>>>> 0e62e97440a56aca2ddcdeb722594af22b8f8791

class App extends Component {
	constructor(props) {
		super(props);

<<<<<<< HEAD
		this.state = { recipeData: null, isLoaded: null };
		this.getResponseData = this.getResponseData.bind(this);
		this.errorForResponse = this.errorForResponse.bind(this);
		this.loading = this.loading.bind(this);
	}


	getResponseData(responseData) {

		console.log("grabbing data", responseData);
		this.setState({ recipeData: responseData, isLoaded: true});
	}
	errorForResponse() {
		this.setState({ error: true });
	}
	loading(){
		this.setState({isLoaded:false});
=======
		this.state = { foodData: [], 
									 isLoaded: false,
									 usersData: [] };

		this.getUsersData = this.getUsersData.bind(this);
		this.getData = this.getData.bind(this);

	}

  // componentDidMount() {
    
  // }

	getData() {
		console.log('grabbing data');
		// axios.get('')
>>>>>>> 0e62e97440a56aca2ddcdeb722594af22b8f8791
	}


	getUsersData() {

		console.log('In getUsersData fetching the users data...');
		
		axios({
			url: 'http://localhost:8080/api/users',
			method: 'get'

		}).then(response => {
			console.log(
				'In App.queryUsers, response from server: response.data: ',
				response.data
			);
			this.setState({ users: response.data });
		});
	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={() => <Redirect to="/users" />} />
					<Route
						exact
						path="/users"
						render={props => {
							return <UsersLogin 
							{...props}
							users={this.state.users}
							queryUsers={this.getUsersData}
							/>;
						}}
					/>
					<Route
						exact
						path="/users/login"
						render={props => {
							return <UserLog 
							{...props}
							users={this.state.users}
							queryUsers={this.getUsersData}
							/>;
						}}
					/>
					<Route
						exact
						path="/users/new"
						render={props => {
							return <UserReg 
							{...props}
							users={this.state.users}
							queryUsers={this.getUsersData}
							/>;
						}}
					/>
					<Route
						exact
						path="/"
						render={props => {
							return (
								<HomeSearchForm
									{...props}
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
						path="/results"
						render={props => {
							return <Results {...props} results={this.state.recipeData} />;
						}}
					/>
					<Route
						exact
						path="/moreInfo/:id"
						render={props => {
							return <RecipeInfo />;
						}}
					/>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
