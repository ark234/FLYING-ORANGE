import React, { Component } from "react";
import logo from "./orange.png";
import "./App.css";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import FixedNav from "./components/FixedNav";
import HomeSearchForm from "./components/HomeSearchForm";
import RecipeInfo from "./components/RecipeInfo";
import Results from "./components/Results";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { recipeData: [], isLoaded: false };
		this.getResponseData = this.getResponseData.bind(this);
	}


	getResponseData(responseData) {
		console.log('grabbing data', responseData);
		this.setState({recipeData:responseData});

	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route
						exact
						path="/"
						render={props => {
							return <HomeSearchForm 
							{...props} 
							getResponseData={this.getResponseData}/>;
						}}
					/>
					<Route
						exact
						path="/results"
						render={props => {
							return (<Results 
									{...props} 
									results = {this.state.recipeData}
									/>);
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
