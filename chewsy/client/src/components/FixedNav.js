import React, { Component } from "react";
// import { Link } from "react-router-dom";

class FixedNav extends Component {
	constructor(props) {
		super(props);
	}

	guestOptions(){
		return(
			<div>
			<button onClick= {()=>this.props.toggleLogin()} >Log In</button>
      <button onClick={()=> this.props.toggleSignUp()} >Sign Up</button>
			</div>
			)

	}
	userOptions(){
		return(
			<div>
			<input type='button' value= 'User Profile' />
			</div>
			)
	}
	render() {
		return (
			<div className='nav'>
			{this.userOptions()}
			{this.guestOptions()}
			</div>
		);
	}
}

export default FixedNav;
