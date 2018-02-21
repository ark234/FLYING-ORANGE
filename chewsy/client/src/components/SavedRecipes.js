import React, { Component } from 'react';

class SavedRecipes extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<h2>User_Name</h2>
				<div>
					<h3>Your Saved Recipes</h3>
					<img src={'placeholder'} />
					<h3>Recipe Name (aka label)</h3>
					<h5>Recipe URI</h5>
					<h5>health labels</h5>
				</div>
			</div>
		);
	}
}

export default SavedRecipes;
