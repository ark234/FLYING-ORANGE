import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div onClick={() => this.props.toggleLogin()} className="modal">
				Login
			</div>
		);
	}
}

export default Login;
