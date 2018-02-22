import React, { Component } from "react";
// import { Link } from "react-router-dom";
import logo from "../images/orange.png";
import Nav from "./FixedNav";
import axios from "axios";

import Register from "./Register";
import Header from "./Header";

class HomeSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.routeToResults = this.routeToResults.bind(this);
  }
  routeToResults() {
    this.props.history.push("/results");
  }

  render() {
    return (
      <div>
        <div className="homePage">

        </div>
      </div>
    );
  }
}

export default HomeSearchForm;
