import React, { Component } from "react";
// import { Link } from "react-router-dom";

class RecipeInfo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		//recipeDatum = data.hits.recipe
		//const recipeName = data.hits.recipe.index.label;

		const recipeDatum = this.props.recipeDatum;
		const index = this.props.index;
		const recipeName = recipeDatum.label;
		const recipeImage = recipeDatum.image;
		const healthLabels = recipeDatum.healthLabels;
		const servings = recipeDatum.yield;
		const calories = recipeDatum.calories;
		const ingredients = recipeDatum.ingredients;
		const viewRecipeLink = recipeDatum.url;
		const dietLabels = recipeDatum.dietLabels;
		const cautions = recipeDatum.cautions;
		const nutrientName = recipeDatum.totalNutrients.index.label;
		const nutrientQty = recipeDatum.totalNutrients.index.quantity;
		const nutrientUnit = recipeDatum.totalNutrients.index.unit;
		const totalDailyName = recipeDatum.totalDaily.index.label;
		const totalDailyQty = recipeDatum.totalDaily.index.quantity;
		const totalDailyUnit = recipeDatum.totalDaily.index.unit;

		return (
			<div>
				<h3>{recipeName}</h3>
				<h3>{recipeImage}</h3>
				<button>Save Recipe</button>
				<button>View Recipe Link</button>
				<h3>{ingredients}</h3>
				<h3>{servings}</h3>
				<h3>{calories}</h3>
				<h3>{dietLabels}</h3>
				<ul>{healthLabels}</ul>
				<h3>{cautions}</h3>
				<h3>
					{nutrientName}
					{nutrientQty}
					{nutrientUnit}
				</h3>
				<h3>
					{totalDailyName}
					{totalDailyQty}
					{totalDailyUnit}
				</h3>
				<button>Save</button>
				<button>Recipe: iFrame Modal will Pop Up</button>
			</div>
		);
	}
}

export default RecipeInfo;
