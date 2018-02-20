import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import logo from "../images/orange.png";
import Nav from "./FixedNav";
import axios from "axios";
import SearchField from './SearchField';

class HomeSearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.routeToResults = this.routeToResults.bind(this);
	}
	routeToResults() {
		this.props.history.push('/results');
	}

  render() {

    return (
      <div>
        <div className="homePage">
          
          <SearchField
          routeToResults={this.routeToResults}
          isLoaded={this.props.isLoaded}
          errorForResponse={this.props.errorForResponse}
          getResponseData={this.props.getResponseData}
          errorFlag={this.props.errorFlag} 
          loadingFlag={this.props.loadingFlag}/>

          <Nav 
          toggleLogin={this.props.toggleLogin}
          toggleSignUp={this.props.toggleSignUp}
          />

        </div>
      </div>
    );
  }
}

export default HomeSearchForm;
