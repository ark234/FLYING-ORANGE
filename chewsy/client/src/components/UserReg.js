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


class UserReg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password_digest: "",
      counter: 0,
      signedup_on: 0,
      profiles_table: "profiles"
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

    console.log('key is: ', key);
    console.log('value is: ', value);

    this.setState(prevState => {
      prevState[key] = value;
      console.log('prevState key/value is: ', prevState[key]);
      return prevState;
    });
  }

  sbmtHandler(e) {

    e.preventDefault();

    axios({
      url: "/new",
      method: "POST",
      data: this.state

    }).then(response => {

      console.log("POST successful, response.data:", response.data);

      this.props.queryUsers();
      this.props.history.push("/users");
    });
  }

  render() {

    const inpNames = ['email', 'password_digest', 'counter', 'signedup_on', 'profiles_table'];
    const inpts = inpNames.map((name, key) => {
      return (
        <div key={key}>
          <label htmlFor={name}>{name}</label><br />
          <input
            type="text"
            id={name}
            name={name}
            onChange={this.chngHandler}
            value={this.state[name]}
          />
        </div>
      );
    });

    return (
      <div>
        <h1>Register New User</h1>
        <br />
        <form onSubmit={this.sbmtHandler}>
          {inpts}
          <input type="submit" value="Submit" />
        </form>
        <br />
      </div>
    );
  }
}

export default UserReg;