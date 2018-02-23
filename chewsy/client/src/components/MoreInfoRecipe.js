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
// This file is from components forlder...     //
//                                             //
/////////////////////////////////////////////////
//                                             //
/////////////////////////////////////////////////

import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class MoreInfoRecipe extends Component {
	constructor(props) {
		super(props);

		this.getMoreInfoRecipe = this.getMoreInfoRecipe.bind(this);
	}

	componentDidMount() {
		console.log('uri: ', this.props.extInfoSource);
		console.log('recId: ', this.props.recId);
		const uri = this.props.extInfoSource;
		// const recId = this.props.recId;
		const recId = this.props.match.params.idRec;
		this.props.getMoreInfoForRecipe(uri, recId);
		this.setState({
			extInfoSource: uri,
			recId: recId
		});
	}

	getMoreInfoRecipe() {
		// const itemRecUs = this.props.location.state.itemRecipeUser;
		// console.log('itemRecUs: ', itemRecUs);
		// this.setState({idRec: itemRecUs.id});
		// const uriIdRec = itemRecUs.recipe_uri;
		// console.log("uri: ", uriIdRec);
		// this.props.getMoreInfoForRecipe();
	}

	render() {
		const moreInfo = this.props.moreInfoRecipe;
		const idRec = this.props.recId;
		const idUser = this.props.userId;
		console.log('userId: ', idUser);

		if (moreInfo !== null) {
			const recDB = this.props.itemRecipeUser;

			// console.log(
			//   "recipe DB record: ",
			//   this.props.location.state.itemRecipeUser
			// );

			// console.log("extended info on curr recipe: ", this.props.moreInfoRecipe);

			/////////////////////////////////////////Roxy...
			// const index = this.props.index;
			// const recipeName = recipeInfo.label;
			// const recipeImage = recipeInfo.image;
			// const healthLabels = recipeInfo.healthLabels;
			// const servings = recipeInfo.yield;
			// const calories = recipeInfo.calories;
			// const ingredients = recipeInfo.ingredients;
			// const viewRecipeLink = recipeInfo.url;
			// const dietLabels = recipeInfo.dietLabels;
			// const cautions = recipeInfo.cautions;
			// const nutrientName = recipeInfo.totalNutrients.index.label;
			// const nutrientQty = recipeInfo.totalNutrients.index.quantity;
			// const nutrientUnit = recipeInfo.totalNutrients.index.unit;
			// const totalDailyName = recipeInfo.totalDaily.index.label;
			// const totalDailyQty = recipeInfo.totalDaily.index.quantity;
			// const totalDailyUnit = recipeInfo.totalDaily.index.unit;
			/////////////////////////////////////////Roxy...

			const mrInf = moreInfo[0];

			return (
				<div className="savedRecipeContainer">
					<div className="db-record">
						<h3>Your Saved Recipe's Extended Info</h3>
						<img className="moreinfo-img" src={mrInf.image} alt="recipe-image" />
						<h3 className="moreinfo-name">{mrInf.label}</h3>
						<h6 className="moreinfo-url">{mrInf.url}</h6>
						<h6 className="moreinfo-health">{mrInf.healthLabels}</h6>
						<h6 className="moreinfo-calor">{mrInf.calories}</h6>
						<h6 className="moreinfo-yield">{mrInf.yield}</h6>
						<h6 className="moreinfo-ingred">{JSON.stringify(mrInf.ingredients)}</h6>
						<br />
						<div key={idRec}>
							{/* <Link to={`/${this.props.tokenData.id}/${idRec}`}>
								To Delete DB record for {mrInf.label}
							</Link> */}
							<button onClick={() => this.props.deleteSavedRecipe}>Delete Recipe</button>
						</div>
						<br />
					</div>
				</div>
			);
		}

		return (
			<div>
				<p>Loading...</p>
			</div>
		);
	}
}

export default MoreInfoRecipe;
