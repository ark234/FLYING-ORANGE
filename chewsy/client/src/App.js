import React, { Component } from 'react';
import logo from './orange.png';
import './App.css';
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";


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
			<Route exact path='/' render={props =>{
				return(

					)
			}} />
			<Route exact path='/results' render={props =>{
				return(

					)
			}} />
			<Route exact path='/moreInfo' render={ props =>{
				return(

					)
			}} />
			</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
