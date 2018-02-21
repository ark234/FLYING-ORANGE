import React, {Component} from 'react';
import Nav from './FixedNav';
import SearchField from './SearchField';
import Login from "./Login";
import Register from "./Register";
class Header extends Component{
constructor(props){
  super(props);
  this.state ={}
}

render(){

  return(
    <div>
    <Nav 
    toggleLogin={this.props.toggleLogin}
    toggleSignUp={this.props.toggleSignUp}
    loginClicked={this.props.loginClicked}
    signUpClicked={this.props.signUpClicked}
    />
    <SearchField 
    routeToResults={this.props.routeToResults}
    isLoaded={this.props.isLoaded}
        errorForResponse={this.props.errorForResponse}
            getResponseData={this.props.getResponseData}
            errorFlag={this.props.errorFlag}
            loadingFlag={this.props.loadingFlag}/>

            {this.props.loginClicked ? (
            <Login toggleLogin={this.props.toggleLogin} />
          ) : null}
          {this.props.signUpClicked ? (
            <Register toggleSignUp={this.props.toggleSignUp} />
          ) : null}
    </div>
    )
}

}


export default Header;