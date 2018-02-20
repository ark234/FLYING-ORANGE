import React, { Component } from "react";
// import { Link } from "react-router-dom";
import navImage from '../images/threeLines.png'
class FixedNav extends Component {
	constructor(props) {
		super(props);
		this.state={
			showNavMenu :false,
			showUserMenu: false,
			showGuestMenu: false,
			userMenuClicked:false,
			guestMenuClicked:false
		}
this.toggleNavShow = this.toggleNavShow.bind(this);
this.showUserNav = this.showUserNav.bind(this);
this.showGuestNav = this.showGuestNav.bind(this);
this.userMenu = this.userMenu.bind(this);
this.guestMenu = this.guestMenu.bind(this);
this.showUserOptions = this.showUserOptions.bind(this);
this.showGuestOptions = this.showGuestOptions.bind(this);
	}

	
	toggleNavShow(){
		this.setState(prevState=>{
			prevState.showNavMenu = !prevState.showNavMenu;
			return prevState;
		});
	}
	showUserNav(){
		this.setState(prevState =>{
			prevState.showUserMenu = !prevState.showUserMenu;
			return prevState;
		})
	}

	showGuestNav(){
		this.setState(prevState =>{
			prevState.showGuestMenu = !prevState.showGuestMenu;
			return prevState;
		})
	}
	showUserOptions(){
		this.setState(prevState =>{
			prevState.userMenuClicked = !prevState.userMenuClicked;
			return prevState;
		})
	}
	showGuestOptions(){
			this.setState(prevState =>{
				prevState.guestMenuClicked = !prevState.guestMenuClicked;
				return prevState;
			})
		}
	guestOptions(){
			return(
				<div>
				<button onClick= {()=>this.props.toggleLogin()} >Log In</button>
	      <button onClick={()=> this.props.toggleSignUp()} >Sign Up</button>
				</div>
				)
		}
	guestMenu(){
		return(
			<div onClick = { ()=> this.showGuestOptions()} >
			Guests
			</div>
			)
	}
	userOptions(){
		return(
			<div>
			<input type='button' value= 'User Profile' />
			<input type='button' value= 'Log Out' />
			</div>
			)
	}
	userMenu(){
		return(
			<div onClick={ ()=> this.showUserOptions() }>
			User
			</div>
			)
	}
	render() {
		return (
			<div>
				<img 
				src={navImage} width='80px' height='80px'
				onClick={this.toggleNavShow} />
				{this.state.showNavMenu? this.userMenu(): null}
					{this.state.showNavMenu? this.guestMenu() : null}
					{this.state.guestMenuClicked? this.guestOptions() : null}
					{this.state.userMenuClicked ? this.userOptions() : null}
			</div>	
		);
	}
}

export default FixedNav;
