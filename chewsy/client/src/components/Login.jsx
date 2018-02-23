import React, { Component } from 'react';
import axios from 'axios';
import UserForm from './UserForm';


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(data) {
		this.props.submit(data);
	}

	render() {
		return (
			<div className="modal-container" onClick={() => this.props.toggleLogin()}>
				<div className="modal" onClick={e => e.stopPropagation()}>
					<UserForm submit={this.onSubmit} type="Login" />
				</div>
			</div>
		);
	}

}

export default Login;
