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

class SavedRecipes extends Component {
	constructor(props) {
		super(props);

		this.state = { 
									 itemRecipeUser: null,
									 userId: null,
									 recipeId: null   
									};

		// this.queryRecipesUser = this.queryRecipesUser.bind(this);
		this.onClickHandler = this.onClickHandler.bind(this);

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
		this.props.getAllUserRecipes();
	}


  onClickHandler(e) {

    e.preventDefault();
    let recId = e.target.id;
    const record = this.props.recipesUser[recId];
    console.log('set: ', record);
    const recUri = record.recipe_uri;
    const idUser = record.user_id;
    recId =+ 1;
    	console.log('event: ', recId);
    	
    	console.log('recipe chosen: ', recUri);

      this.props.getRecipesUserData(record, recId, recUri);
      this.props.history.push(`/users/${idUser}/savedRecipes/${recId}`);
    
  }

	render() {

		const recipesUserList = this.props.recipesUser.map((recipeDB, key) => {

			// const idUser = recipeDB.user_id;
			const idUser = this.props.userId;
			const recId = recipeDB.id;
			const recUri = recipeDB.recipe_uri;
			console.log('idUser:', idUser);
			console.log('recId:', recId);

			return (
							<div className="db-record" key={key}>
								<h3>Your Saved Recipes</h3>
								<img className="recipeDBImg" src={recipeDB.recipe_img_url} />
								<h3 className="recipeDBName">{recipeDB.recipe_label}</h3>
								<h6 className="recipeDBUri">{recipeDB.recipe_uri}</h6>
								<h6 className="healthLabels">{recipeDB.recipe_hlth_lbl}</h6>
								<div key={key}>
										<Link to={`/users/${idUser}/savedRecipes/${recId}`}
													id={key} 
									        onClick={this.onClickHandler}
									           		>See additional info on {recipeDB.recipe_label}</Link>
								</div>
							</div>

							);
		});

		return (
			<div className="recipeResultsContainer">
				<div className="recipes-user">
					<h3 className="viewRecipe">User Name: {this.state.userId} </h3>
					<div className="theList">
						{recipesUserList}
					</div>
				</div>
			</div>
		);
	}
}

export default SavedRecipes;
