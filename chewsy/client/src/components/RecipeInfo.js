import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Results from "./Results";

class RecipeInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// add back to line 55ish
	// {recipeInfo.totalNutrients.FAT.label.map(function(name) {
	// 	const nutrientName = name;
	// 	return <li>{nutrientName}</li>;
	// })}

	render() {
		//recipeInfo = data.hits.recipe
		//const recipeName = data.hits.recipe.index.label;

		const recipeInfo = this.props.recipeDatum;
		const index = this.props.index;

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

		// const ingredients = recipeInfo.ingredients;
		console.log(recipeInfo.totalNutrients.CA.label);

		return (
			<div>
				<h1>{recipeInfo.label}</h1>
				<img src={recipeInfo.image} />
				<h2>Health Labels:{recipeInfo.healthLabels}</h2>
				<h2>{recipeInfo.yield} Servings</h2>
				<h2>{Math.trunc(recipeInfo.calories)} calories</h2>
				<h2>Diet Labels:{recipeInfo.dietLabels}</h2>
				<h2>Cautions:{recipeInfo.cautions}</h2>
				<h2>Nutrients:</h2>
				<h3>{recipeInfo.totalNutrients.ENERC_KCAL.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalNutrients.ENERC_KCAL.quantity)}{" "}
					{recipeInfo.totalNutrients.ENERC_KCAL.unit}
				</h3>

				<h3>{recipeInfo.totalNutrients.FAT.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalNutrients.FAT.quantity)}{" "}
					{recipeInfo.totalNutrients.FAT.unit}
				</h3>

				<h3>{recipeInfo.totalNutrients.CHOCDF.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalNutrients.CHOCDF.quantity)}{" "}
					{recipeInfo.totalNutrients.CHOCDF.unit}
				</h3>

				<h3>{recipeInfo.totalNutrients.SUGAR.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalNutrients.SUGAR.quantity)}{" "}
					{recipeInfo.totalNutrients.SUGAR.unit}
				</h3>

				<h3>{recipeInfo.totalNutrients.PROCNT.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalNutrients.PROCNT.quantity)}{" "}
					{recipeInfo.totalNutrients.PROCNT.unit}
				</h3>

				<h3>{recipeInfo.totalNutrients.CHOLE.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalNutrients.CHOLE.quantity)}{" "}
					{recipeInfo.totalNutrients.CHOLE.unit}
				</h3>

				<h3>{recipeInfo.totalNutrients.NA.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalNutrients.NA.quantity)}{" "}
					{recipeInfo.totalNutrients.NA.unit}
				</h3>

				<h3>{recipeInfo.totalNutrients.CA.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalNutrients.CA.quantity)}{" "}
					{recipeInfo.totalNutrients.CA.unit}
				</h3>
				<ul />
				<h2>Total Daily Value % </h2>
				<h3>{recipeInfo.totalDaily.ENERC_KCAL.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalDaily.ENERC_KCAL.quantity)}
					{recipeInfo.totalDaily.ENERC_KCAL.unit}
				</h3>

				<h3>{recipeInfo.totalDaily.FAT.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalDaily.FAT.quantity)}
					{recipeInfo.totalDaily.FAT.unit}
				</h3>

				<h3>{recipeInfo.totalDaily.CHOCDF.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalDaily.CHOCDF.quantity)}
					{recipeInfo.totalDaily.CHOCDF.unit}
				</h3>

				<h3>{recipeInfo.totalDaily.PROCNT.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalDaily.PROCNT.quantity)}
					{recipeInfo.totalDaily.PROCNT.unit}
				</h3>

				<h3>{recipeInfo.totalDaily.CHOLE.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalDaily.CHOLE.quantity)}
					{recipeInfo.totalDaily.CHOLE.unit}
				</h3>

				<h3>{recipeInfo.totalDaily.NA.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalDaily.NA.quantity)}
					{recipeInfo.totalDaily.NA.unit}
				</h3>

				<h3>{recipeInfo.totalDaily.CA.label}</h3>
				<h3>
					{Math.trunc(recipeInfo.totalDaily.CA.quantity)}
					{recipeInfo.totalDaily.CA.unit}
				</h3>
				<h3 />
				<h2>Ingredients:</h2>
				<ul>
					{recipeInfo.ingredientLines.map(function(ingredient) {
						const ingredientName = ingredient;
						return <li>{ingredientName}</li>;
					})}
				</ul>

				<div>
					<button>Save Recipe</button>
					<button>
						View Recipe
						<a href={recipeInfo.url} />
					</button>
				</div>
			</div>
		);
	}
}

export default RecipeInfo;
