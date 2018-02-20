import React, { Component } from "react";
// import { Link } from "react-router-dom";

class RecipeInfo extends Component {
	constructor(props) {
		super(props);
		this.state={}
	}

	render() {
		//recipeDatum = data.hits.recipe
		//const recipeName = data.hits.recipe.index.label;

		const recipeDatum = this.props.recipeDatum;
		// const index = this.props.index;
		// const recipeName = recipeDatum.label;
		// const recipeImage = recipeDatum.image;
		// const healthLabels = recipeDatum.healthLabels;
		// const servings = recipeDatum.yield;
		// const calories = recipeDatum.calories;
		// const ingredients = recipeDatum.ingredients;
		// const viewRecipeLink = recipeDatum.url;
		// const dietLabels = recipeDatum.dietLabels;
		// const cautions = recipeDatum.cautions;
		// const nutrientName = recipeDatum.totalNutrients.index.label;
		// const nutrientQty = recipeDatum.totalNutrients.index.quantity;
		// const nutrientUnit = recipeDatum.totalNutrients.index.unit;
		// const totalDailyName = recipeDatum.totalDaily.index.label;
		// const totalDailyQty = recipeDatum.totalDaily.index.quantity;
		// const totalDailyUnit = recipeDatum.totalDaily.index.unit;
		console.log(recipeDatum);
		return (
			<div>
		
				<button>Save Recipe</button>
				<button>View Recipe Link</button>
				
				<button>Save</button>
				<button>Recipe: iFrame Modal will Pop Up</button>
			</div>
		);
	}
}

export default RecipeInfo;
