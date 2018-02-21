/////////////////////////////////////////////////
//                                             //
//    Project CHEWSY                           //
//    Flying Orange Team at GA, New York       //
//    February, 2018                           //
//                                             //
//    Instructors:                             //
//        Tims Gardner                         //
//        Drake Tally                          //
//        Dominic Farquharson                  //
//                                             //
/////////////////////////////////////////////////
//                                             //
// This file is from client/src/components...  //
//                                             //
/////////////////////////////////////////////////


import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css';


class UserLog extends Component {
  constructor(props) {
    super(props);

   
    this.state = {
      email: "",
      password_digest: ""

    };

    console.log(props);
    console.log(this.state);

    this.chngHandler = this.chngHandler.bind(this);
    this.sbmtHandler = this.sbmtHandler.bind(this);

  }

  // componentDidMount() {
    
  // }

  chngHandler(e) {

    e.preventDefault();

    const key = e.target.name;
    const value = e.target.value;

    this.setState(prevState => {
      prevState[key] = value;
      return prevState;
    });
  }

  sbmtHandler(e) {

    e.preventDefault();

    axios({
      url: "http://localhost:8080/api/users",
      method: "POST",
      data: this.state

    }).then(response => {
      
      console.log("POST successful, response.data:", response.data);

      this.props.queryUsers();
      this.props.history.push("/users");
    });
  }

  render() {

    const inpNames = ['email', 'password'];
    const inpts = inpNames.map((name, key) => {
      return (
        <div key={key}>
          <br />
          <label htmlFor={name}>{name}</label><br />
          <input
            type="text"
            id={name}
            name={name + '_' + key}
            onChange={this.chngHandler}
            value={this.state[name]}
          />
          <br />
        </div>
      );
    });

    return (
      <div className="log_user">
        <form onSubmit={this.sbmtHandler}>
          {inpts}
          <input type="submit" value="Submit" /><br />
        </form>
        <br />
        <div>
        <Link to="/users/new">Register New User</Link>
        </div>
        <br />
      </div>

    );
  }
}

export default UserLog;