import React, { Component } from 'react';
import logo from './orange.png';
import './App.css';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import FixedNav from './components/FixedNav';
import HomeSearchForm from './components/HomeSearchForm';
import RecipeInfo from './components/RecipeInfo';
import Results from './components/Results';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { foodData: [], isLoaded: false };
	}

	getData() {
		console.log('grabbing data');
		// axios.get('')
	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
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
