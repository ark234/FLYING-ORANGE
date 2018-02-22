// import { Link } from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import Login from './Login';
import Register from './Register';
import Header from './Header';

class ShowResults extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.routeToResults = this.routeToResults.bind(this);
	}

	routeToResults() {
		this.props.history.push('/results');
	}

	render() {
		const results = this.props.results;

		const resultsList = results.hits.map(recipeObject => {
			const recipeInfo = recipeObject.recipe;

			return (
				<div key={recipeInfo.uri} className="recipeResultsContainer">
					<div className="recipe-card">
						<h3 className="viewRecipe">View</h3>
						<div
							onClick={() => {
								this.props.moreInfo(recipeInfo);
								this.props.history.push('/moreInfo');
							}}
						>
							<img src={recipeInfo.image} className="recipeResultsImg" />
							<h2 className="recipeName">{recipeInfo.label}</h2>
							<h6 className="healthLabels">{recipeInfo.healthLabels}</h6>
							<h6 className="servings">{recipeInfo.yield} servings</h6>
							<h6 className="calories">{Math.trunc(recipeInfo.calories)} calories</h6>
						</div>
					</div>
				</div>
			);
		});

		return (
			this.props.results===null? null : (<div>
              <div className="search-bar">
                
              </div>
      
              <div className="results-header">
                Found {results.count} matching results for {results.q}
              </div>
              <div className="test">{resultsList }</div>
            </div>)
		);
	}
}

export default ShowResults;
