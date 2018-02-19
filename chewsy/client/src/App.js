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

class App extends Component {
	constructor(props) {
		super(props);

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
							return <HomeSearchForm />;
						}}
					/>
					<Route
						exact
						path="/results"
						render={props => {
							return <Results />;
						}}
					/>
					<Route
						exact
						path="/moreInfo"
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
