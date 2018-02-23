import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RecipeInfo extends Component {
	constructor(props) {
		super(props);
		const recipeInfo = this.props.recipeDatum;
		this.state = {
			user_id: 1,
			recipe_uri: recipeInfo.uri,
			recipe_url: recipeInfo.url,
			recipe_img_url: recipeInfo.image,
			recipe_label: recipeInfo.label,
			recipe_hlth_lbl: recipeInfo.healthlabels,
			recipe_comment: '*',
			recipe_rating: 5
		};
		this.saveRecipe = this.saveRecipe.bind(this);
	}

	saveRecipe() {
		axios({
			url: 'http://localhost:8080/recipes/save',
			method: 'POST',
			data: this.state
		}).then(response => {
			console.log('post successful, response.data:', response.data);
		});
	}

	handleSubmit(ev) {
		ev.preventDefault();
		this.saveRecipe();
		this.props.history.push('/recipes/save');
	}
	render() {
		const recipeInfo = this.props.recipeDatum;
		const index = this.props.index;

		console.log('recipe url', recipeInfo.url);

		return (
			<div className="information">
				<div className="info-title">
					<h1>{recipeInfo.label}</h1>

					<h2>
						{recipeInfo.yield} Servings {Math.trunc(recipeInfo.calories)} calories
					</h2>
				</div>
				<div className="style-this">
					<img className="info-image" src={recipeInfo.image} />
					<button onSubmit={this.handleSubmit.bind(this)}>Save Recipe</button>
					<button>
						<a href={recipeInfo.url}>View Recipe</a>
					</button>
					<div className="performance-facts">
						<header className="performance-facts__header">
							<h1 className="performance-facts__title">Nutrition Facts</h1>
							<p className="p-className">{recipeInfo.label}</p>
							<p className="p-className">Serving Per Recipe {recipeInfo.yield}</p>
						</header>

						<table className="performance-facts__table">
							<thead>
								<tr>
									<th colspan="3" className="small-info">
										Amount Per Recipe
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th colspan="2">
										<b>Calories </b>
										{Math.trunc(recipeInfo.calories)}
									</th>
									<td>Calories from Fat 130</td>
								</tr>
								<tr className="thick-row">
									<td colspan="3" className="small-info">
										<b>% Daily Value*</b>
									</td>
								</tr>
								<tr>
									<th colspan="2">
										<b>Total Fat </b>
										{Math.trunc(recipeInfo.totalNutrients.FAT.quantity)}
										{recipeInfo.totalNutrients.FAT.unit}
									</th>
									<td>
										<b>{Math.trunc(recipeInfo.totalDaily.FAT.quantity)}%</b>
									</td>
								</tr>
								<tr>
									<td className="blank-cell" />
									<th>
										Saturated Fat {Math.trunc(recipeInfo.totalNutrients.FASAT.quantity)}
										{recipeInfo.totalNutrients.FAT.unit}
									</th>
									<td>
										<b>{Math.trunc(recipeInfo.totalDaily.FASAT.quantity)}%</b>
									</td>
								</tr>
								<tr>
									<td className="blank-cell" />
									<th>Trans Fat </th>
									<td />
								</tr>
								<tr>
									<th colspan="2">
										<b>Cholesterol </b>
										{Math.trunc(recipeInfo.totalNutrients.CHOLE.quantity)}
										{recipeInfo.totalNutrients.CHOLE.unit}
									</th>
									<td>
										<b>{Math.trunc(recipeInfo.totalDaily.CHOLE.quantity)}%</b>
									</td>
								</tr>
								<tr>
									<th colspan="2">
										<b>Sodium </b>
										{Math.trunc(recipeInfo.totalNutrients.NA.quantity)}
										{recipeInfo.totalNutrients.NA.unit}
									</th>
									<td>
										<b>{Math.trunc(recipeInfo.totalDaily.NA.quantity)}%</b>
									</td>
								</tr>
								<tr>
									<th colspan="2">
										<b>Total Carbohydrate </b>
										{Math.trunc(recipeInfo.totalNutrients.CHOCDF.quantity)}
										{recipeInfo.totalNutrients.CHOCDF.unit}
									</th>
									<td>
										<b>{Math.trunc(recipeInfo.totalDaily.CHOCDF.quantity)}%</b>
									</td>
								</tr>
								<tr>
									<td className="blank-cell" />
									<th>
										Dietary Fiber {Math.trunc(recipeInfo.totalNutrients.FIBTG.quantity)}
										{recipeInfo.totalNutrients.FIBTG.unit}
									</th>
									<td>
										<b>{Math.trunc(recipeInfo.totalDaily.FIBTG.quantity)}%</b>
									</td>
								</tr>
								<tr>
									<td className="blank-cell" />
									<th>
										Sugars {Math.trunc(recipeInfo.totalNutrients.SUGAR.quantity)}
										{recipeInfo.totalNutrients.SUGAR.unit}
									</th>
									<td />
								</tr>
								<tr className="thick-end">
									<th colspan="2">
										<b>Protein </b>
										{Math.trunc(recipeInfo.totalNutrients.PROCNT.quantity)}
										{recipeInfo.totalNutrients.PROCNT.unit}
									</th>
									<td />
								</tr>
							</tbody>
						</table>

						<table className="performance-facts__table--grid">
							<tbody>
								<tr>
									<td colspan="2">
										Vitamin A {Math.trunc(recipeInfo.totalDaily.VITA_RAE.quantity)}%
									</td>
									<td>Vitamin C {Math.trunc(recipeInfo.totalDaily.VITC.quantity)}%</td>
								</tr>
								<tr className="thin-end">
									<td colspan="2">Calcium {Math.trunc(recipeInfo.totalNutrients.CA.quantity)}%</td>
									<td>Iron {Math.trunc(recipeInfo.totalDaily.FE.quantity)}%</td>
								</tr>
							</tbody>
						</table>

						<p className="small-info">
							* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be
							higher or lower depending on your calorie needs:
						</p>
					</div>
				</div>

				<h2>Health Labels:{recipeInfo.healthLabels}</h2>
				<h2>Diet Labels:{recipeInfo.dietLabels}</h2>
				<h2>Cautions:{recipeInfo.cautions}</h2>

				<h2>Ingredients:</h2>
				<ul>
					{recipeInfo.ingredientLines.map(function(ingredient) {
						const ingredientName = ingredient;
						return <li>{ingredientName}</li>;
					})}
				</ul>
			</div>
		);
	}
}

export default RecipeInfo;
