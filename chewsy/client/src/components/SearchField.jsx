import React, { Component } from 'react';
import axios from 'axios';

class SearchFeild extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.postApiParams = this.postApiParams.bind(this);
		this.handleError = this.handleError.bind(this);
		this.handleLoad = this.handleLoad.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		this.setState({ [name]: event.target.value });
	}

	handleChangeCheckbox(event) {
		const value = event.target.value;

		if (this.healthArray.has(value)) {
			console.log('ifStatement');

			this.healthArray.delete(value);
		} else {
			console.log('elseStatement');
			this.healthArray.add(value);
		}
		const healthArray = Array.from(this.healthArray);
		this.setState({ health: healthArray });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.postApiParams(this.state);
		console.log(this.state);
	}

	postApiParams(info) {
		this.props.isLoaded();
		axios({
			url: 'http://localhost:8080/recipes',
			method: 'post',
			data: info
		})
			.then(response => {
				this.props.getResponseData(response.data);
				this.props.routeToResults();

				console.log(response);
			})
			.catch(error => {
				console.log('NO response', error);
				this.props.errorForResponse();
			});
	}

	handleError() {
		return <h6>Please enter an ingredent in Search Bar</h6>;
	}
	handleLoad() {
		return <img src="../images/orange.png" />;
	}

	componentDidMount() {
		this.healthArray = new Set();
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
					<label>
						{allergen}:
						<input
							className="checkBox"
							onChange={this.handleChangeCheckbox}
							type="checkbox"
							name="health"
							value={allergen}
							id={allergen}
						/>
					</label>
				</div>
			);
		});
		const form = () => {
			return (
				<form onSubmit={this.handleSubmit} className="apiQueryForm">
					<div className="textInputContainer">
						<h2>Cravings</h2>

						<input className="textInput" type="text" name="q" onChange={this.handleChange} />
						<input type="submit" className="submitButton" value="click here to search" />
					</div>
					<div className="checkBoxContainer">
						<h2>Allergens</h2>
						{checkBoxes}
					</div>
				</form>
			);
		};

		return (
			<div>
				{form()}
				{this.props.loadingFlag === false ? this.handleLoad() : null}
				{this.props.errorFlag ? this.handleError() : null}
			</div>
		);
	}
}

export default SearchFeild;
