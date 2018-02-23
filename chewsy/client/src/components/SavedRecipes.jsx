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

import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import TokenService from "../services/TokenService";

class SavedRecipes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recipesUser: [],
			userId: null
		};
		this.queryRecipesUser = this.queryRecipesUser.bind(this);
		this.deleteRecipe = this.deleteRecipe.bind(this);
		// this.deleteRecipe = this.deleteRecipe.bind(this, recipes.id);
	}

	// [
	//    {
	//        "id": "1",
	//        "user_id": 1,
	//        "recipe_uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_3921adf30bb0c9736b9ac30f447f8a63",
	//        "recipe_url": "http://www.saveur.com/article/Recipes/Roast-Beef",
	//        "recipe_img_url": "https://www.edamam.com/web-img/98a/98aa5d5cc0d88b28c2b9221a099b1a14.jpg",
	//        "recipe_label": "Roast Beef",
	//        "recipe_hlth_lbl": "Sugar-Conscious,\tPeanut-Free,\tTree-Nut-Free, Alcohol-Free\t\t\t\t\t\t\t\t\t\t\t         \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t            \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t            ",
	//        "recipe_comment": "***",
	//        "recipe_rating": 5
	//    }
	// ]

	componentDidMount() {
		this.queryRecipesUser();
	}

	queryRecipesUser() {
		const idUser = this.props.userId;

		axios({
			url: `http://localhost:8080/users/${idUser}/savedRecipes`,
			method: "get",
			headers: {
				Authorization: `Bearer ${TokenService.read()}`
			}
		})
			.then(response => {
				console.log(
					"In SavedRecipes.queryRecipesUser: server responded. response.data: ",
					response.data
				);
				this.setState({
					recipesUser: response.data,
					userId: idUser
				});
				this.props.getRecipesUserData(response.data);
			})
			.catch(error => {
				console.log("error getting saved recipes");
				console.log("error response:", error.response);
			});
	}

	render() {
		const recipesUserList = this.state.recipesUser.map(recipeDB => {
			return (
				<div className="db-record" key={recipeDB.id}>
					<h3>Your Saved Recipes</h3>
					<img className="recipeDBImg" src={recipeDB.recipe_img_url} />
					<h3 className="recipeDBName">{recipeDB.recipe_label}</h3>
					<h6 className="recipeDBUri">{recipeDB.recipe_uri}</h6>
					<h6 className="healthLabels">{recipeDB.recipe_hlth_lbl}</h6>
				</div>
			);
		});

		return (
			<div className="recipeResultsContainer">
				<div className="recipes-user">
					<h3 className="viewRecipe">User Name: {this.state.userId} </h3>
					<div className="theList">{recipesUserList}</div>
				</div>
			</div>
		);
	}
}

export default SavedRecipes;
