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
import { Link } from "react-router-dom";
import '../App.css';

class UsersLogin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login">
        <h1>Please Login or Register</h1>

        <div className="existing_user">

          <h2>User Login</h2>

          <div className="log_user">
            <Link to="/users/login">Please Login</Link>
          </div>

          <div className="new_user">
            <Link to="/users/new">Register New User</Link>
          </div>

        </div>

        <div className="return-box">
            <Link to="/users">Back to Users</Link>
        </div>
      </div>
  
    );
  }
}

export default UsersLogin;