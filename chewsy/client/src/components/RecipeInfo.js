import React, { Component } from 'react';
// import { Link } from "react-router-dom";

class RecipeInfo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Recipe Information</h1>
				<h3>Image</h3>
				<h3>Health Labels</h3>
				<h3>Nutrtion Label</h3>
				<h3>Ingredients</h3>
				<button>Save</button>
				<button>Recipe: iFrame Modal will Pop Up</button>
			</div>
		);
	}
}

export default RecipeInfo;
