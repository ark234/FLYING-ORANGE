import React, { Component } from 'react';
// import { Link } from "react-router-dom";

class HomeSearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			health: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
	}
	handleChange(event) {
		const name = event.target.name;
		this.setState({ [name]: event.target.value });
	}
	handleChangeCheckbox(event) {
		const value = event.target.value;
		if (!this.state.health.includes(value)) {
			this.setState(prevState => {
				prevState.health.push(value);
				return prevState;
			});
		} else {
			this.setState(prevState => {
				prevState.health.pop;
			});
		}
	}

	render() {
		const allergens = [
			'crustacean-free',
			'shellfish-free',
			'soy-free',
			'dairy-free',
			'egg-free',
			'fish-free',
			'gluten-free',
			'kosher',
			'lupine-free',
			'peanut-free',
			'pork-free',
			'red-meat-free',
			'vegan',
			'tree-nut-free',
			'wheat-free'
		];

		const checkBoxes = allergens.map((allergen, i) => {
			return (
				<div key={i}>
					<p>
						{allergen}
						<input
							onChange={this.handleChangeCheckbox}
							type="checkbox"
							name="health"
							value={allergen}
						/>
					</p>
				</div>
			);
		});

		return (
			<div>
				<div>
					<button>Log In</button>
					<button>Sign Up</button>
				</div>

				<form>
					<h2>Allergens</h2>
					{checkBoxes}

					<h2>Cravings</h2>

					<input type="text" name="foodType" onChange={this.handleChange} />

					<button>Go</button>
				</form>
			</div>
		);
	}
}

export default HomeSearchForm;
