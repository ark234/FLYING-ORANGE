import React, { Component } from 'react';
// import { Link } from "react-router-dom";

class HomeSearchForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div>
					<button>Log In</button>
					<button>Sign Up</button>
				</div>

				<form>
					<h2>Allergens</h2>
					<h2>Cravings</h2>
					<button>Go</button>
				</form>
			</div>
		);
	}
}

export default HomeSearchForm;
