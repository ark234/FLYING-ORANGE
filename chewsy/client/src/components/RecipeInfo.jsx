import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RecipeInfo extends Component {
	constructor(props) {
		super(props);
		const recipeInfo = this.props.recipeDatum;
		const userId = this.props.tokenData.id;
		console.log('**USER ID**', userId);
		this.state = {
			user_id: userId,
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

	clickHandler() {
		this.saveRecipe();
		console.log('PROPS ==>', this.props);
		this.props.history.goBack();
	}
	render() {
		const recipeInfo = this.props.recipeDatum;
		const index = this.props.index;

		console.log('recipe url', recipeInfo.url);

		return (
			<div className="information">
				<div className="info-title">
					<h1 className="recipe-name-info">{recipeInfo.label}</h1>

					<h2 className="info-text">
						{recipeInfo.yield} Servings {Math.trunc(recipeInfo.calories)} calories
					</h2>
				</div>
				<div className="style-this">
					<img className="info-image" src={recipeInfo.image} />
					{/* <button onSubmit={this.handleSubmit.bind(this)}>Save Recipe</button> */}
					<button
						onClick={() => {
							this.clickHandler();
						}}
					>
						Save Recipe
					</button>
					<button>
						<a href={recipeInfo.url}>View Recipe</a>
					</button>
					<div className="nutrition-facts">
						<header className="nutrition-facts__header">
							<h1 className="nutrition-facts__title">Nutrition Facts</h1>
							<p className="p-className">{recipeInfo.label}</p>
							<p className="p-className">Serving Per Recipe {recipeInfo.yield}</p>
						</header>

						<table className="nutrition-facts__table">
							<thead>
								<tr>
									<th colSpan="3" className="small-info">
										Amount Per Recipe
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th colSpan="2">
										<b>Calories </b>
										{Math.trunc(recipeInfo.calories)}
									</th>
									<td>Calories from Fat</td>
								</tr>
								<tr className="thick-row">
									<td colSpan="3" className="small-info">
										<b>% Daily Value*</b>
									</td>
								</tr>
								<tr>
									<th colSpan="2">
										<b>Total Fat </b>
										{recipeInfo.totalNutrients.FAT
											? Math.trunc(recipeInfo.totalNutrients.FAT.quantity)
											: null}
										{recipeInfo.totalNutrients.FAT && recipeInfo.totalNutrients.FAT.unit}
									</th>
									<td>
										<b>
											{recipeInfo.totalDaily.FAT && Math.trunc(recipeInfo.totalDaily.FAT.quantity)}%
										</b>
									</td>
								</tr>
								<tr>
									<td className="blank-cell" />
									<th>
										Saturated Fat{' '}
										{recipeInfo.totalNutrients.FASAT
											? Math.trunc(recipeInfo.totalNutrients.FASAT.quantity)
											: null}
										{recipeInfo.totalNutrients.FASAT && recipeInfo.totalNutrients.FASAT.unit}
									</th>
									<td>
										<b>
											{recipeInfo.totalDaily.FASAT &&
												Math.trunc(recipeInfo.totalDaily.FASAT.quantity)}%
										</b>
									</td>
								</tr>
								<tr>
									<td className="blank-cell" />
									<th>Trans Fat </th>
									<td />
								</tr>
								<tr>
									<th colSpan="2">
										<b>Cholesterol </b>
										{recipeInfo.totalNutrients.CHOLE
											? Math.trunc(recipeInfo.totalNutrients.CHOLE.quantity)
											: null}
										{recipeInfo.totalNutrients.CHOLE && recipeInfo.totalNutrients.CHOLE.unit}
									</th>
									<td>
										<b>
											{recipeInfo.totalDaily.CHOLE &&
												Math.trunc(recipeInfo.totalDaily.CHOLE.quantity)}%
										</b>
									</td>
								</tr>
								<tr>
									<th colSpan="2">
										<b>Sodium </b>
										{recipeInfo.totalNutrients.NA.quantity
											? Math.trunc(recipeInfo.totalNutrients.NA.quantity)
											: null}
										{recipeInfo.totalNutrients.NA && recipeInfo.totalNutrients.NA.unit}
									</th>
									<td>
										<b>
											{recipeInfo.totalDaily.NA && Math.trunc(recipeInfo.totalDaily.NA.quantity)}%
										</b>
									</td>
								</tr>
								<tr>
									<th colSpan="2">
										<b>Total Carbohydrate </b>
										{recipeInfo.totalNutrients.CHOCDF
											? Math.trunc(recipeInfo.totalNutrients.CHOCDF.quantity)
											: null}
										{recipeInfo.totalNutrients.CHOCDF && recipeInfo.totalNutrients.CHOCDF.unit}
									</th>
									<td>
										<b>
											{recipeInfo.totalDaily.CHOCDF &&
												Math.trunc(recipeInfo.totalDaily.CHOCDF.quantity)}%
										</b>
									</td>
								</tr>
								<tr>
									<td className="blank-cell" />
									<th>
										Dietary Fiber{' '}
										{recipeInfo.totalNutrients.FIBTG
											? Math.trunc(recipeInfo.totalNutrients.FIBTG.quantity)
											: null}
										{recipeInfo.totalNutrients.FIBTG && recipeInfo.totalNutrients.FIBTG.unit}
									</th>
									<td>
										<b>
											{recipeInfo.totalDaily.FIBTG &&
												Math.trunc(recipeInfo.totalDaily.FIBTG.quantity)}%
										</b>
									</td>
								</tr>
								<tr>
									<td className="blank-cell" />
									<th>
										Sugars{' '}
										{recipeInfo.totalNutrients.SUGAR
											? Math.trunc(recipeInfo.totalNutrients.SUGAR.quantity)
											: null}
										{recipeInfo.totalNutrients.SUGAR && recipeInfo.totalNutrients.SUGAR.unit}
									</th>
									<td />
								</tr>
								<tr className="thick-end">
									<th colSpan="2">
										<b>Protein </b>
										{recipeInfo.totalNutrients.PROCNT
											? Math.trunc(recipeInfo.totalNutrients.PROCNT.quantity)
											: null}
										{recipeInfo.totalNutrients.PROCNT && recipeInfo.totalNutrients.PROCNT.unit}
									</th>
									<td />
								</tr>
							</tbody>
						</table>

						<table className="nutrition-facts__table--grid">
							<tbody>
								<tr>
									<td colSpan="2">
										Vitamin A{' '}
										{recipeInfo.totalDaily.VITA_RAE
											? Math.trunc(recipeInfo.totalDaily.VITA_RAE.quantity) + '%'
											: null}
									</td>
									<td>
										Vitamin C{' '}
										{recipeInfo.totalDaily.VITC
											? Math.trunc(recipeInfo.totalDaily.VITC.quantity) + '%'
											: null}
									</td>
									<td>Vitamin C {Math.trunc(recipeInfo.totalDaily.VITC.quantity)}%</td>
								</tr>
								<tr className="thin-end">
									<td colSpan="2">
										Calcium
										{recipeInfo.totalDaily.CA
											? Math.trunc(recipeInfo.totalDaily.CA.quantity) + '%'
											: null}
									</td>
									<td>
										Iron{' '}
										{recipeInfo.totalDaily.FE
											? Math.trunc(recipeInfo.totalNutrients.FE.quantity) + '%'
											: null}
									</td>
								</tr>
							</tbody>
						</table>

						<p className="small-info">
							* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be
							higher or lower depending on your calorie needs:
						</p>
					</div>
				</div>
				<div className="bottom-text">
					<h2 className="info-text">Health Labels: {recipeInfo.healthLabels}</h2>
					<h2 className="info-text">Diet Labels: {recipeInfo.dietLabels}</h2>
					<h2 className="info-text">Cautions: {recipeInfo.cautions}</h2>

					<h2 className="info-text">Health Labels: {recipeInfo.healthLabels}</h2>
					<h2 className="info-text">Diet Labels: {recipeInfo.dietLabels}</h2>
					<h2 className="info-text">Cautions: {recipeInfo.cautions}</h2>

					<h2 className="info-text">Ingredients:</h2>
					<ul>
						{recipeInfo.ingredientLines.map(function(ingredient, i) {
							const ingredientName = ingredient;
							return <li key={i}>{ingredientName}</li>;
						})}
					</ul>
				</div>
			</div>
		);
	}
}

export default RecipeInfo;
