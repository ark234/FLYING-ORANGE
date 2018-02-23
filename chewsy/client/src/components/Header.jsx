import React, { Component } from 'react';
import Nav from './FixedNav';
import SearchField from './SearchField';
import Login from './Login';
import Register from './Register';
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Nav
				{...this.props}
					toggleLogin={this.props.toggleLogin}
					toggleSignUp={this.props.toggleSignUp}
					loginClicked={this.props.loginClicked}
					signUpClicked={this.props.signUpClicked}
					logout={this.props.logout}
					isLoggedIn={this.props.isLoggedIn}
					toggleNav={this.props.toggleNav}
					navClicked={this.props.navClicked}
					tokenData={this.props.tokenData}
				/>
				<SearchField
					routeToResults={this.props.routeToResults}
					isLoaded={this.props.isLoaded}
					errorForResponse={this.props.errorForResponse}
					getResponseData={this.props.getResponseData}
					errorFlag={this.props.errorFlag}
					loadingFlag={this.props.loadingFlag}
				/>
			</div>
		);
	}
}

export default Header;
