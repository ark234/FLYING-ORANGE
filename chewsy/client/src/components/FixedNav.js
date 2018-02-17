import React, { Component } from 'react';
// import { Link } from "react-router-dom";

class FixedNav extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<form>
				<h3>Dietary Restrictions</h3>
				<h3>Search Recipe</h3>
				<button>Go</button>
			</form>
		);
	}
}

export default FixedNav;
