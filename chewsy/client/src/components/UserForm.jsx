import React, { Component } from 'react';

export default class UserForm extends Component {
	constructor(props) {
		super(props);

		// set initial state
		this.state = {
			email: '',
			password: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// preventDefault and lift state back up to the parent
	handleSubmit(e) {
		e.preventDefault();
		this.props.submit(this.state);
	}

	// update form state
	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Email
					<input type="text" name="email" onChange={this.handleChange} value={this.state.email} />
				</label>
				<label>
					Password
					<input
						type="password"
						name="password"
						onChange={this.handleChange}
						value={this.state.password}
					/>
				</label>
				<button type="submit" value="Submit">
					Submit
				</button>
			</form>
		);
	}
}
