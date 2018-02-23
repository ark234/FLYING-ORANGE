import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(data) {
		this.props.submit(data);
	}

	render() {
		// take note how the onSubmit method is passed down to the UserForm
		// as a prop
		return (
			<div className="modal-container" onClick={() => this.props.toggleSignUp()}>
				<div className="modal" onClick={ e => e.stopPropagation()}>
					<UserForm submit={this.onSubmit} type="Register" />
				</div>
			</div>
		);
	}
}
