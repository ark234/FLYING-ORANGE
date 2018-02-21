import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';


class User extends Component {
  constructor(props) {
    super(props);

    // console.log(props);

    this.userListItem = this.userListItem.bind(this);
  }

  userListItem(userDatum, index) {
    const id = userDatum.id;
    return (
      <div key={index}>
        <Link to={`/users/${id}`}>{userDatum.name}</Link>
      </div>
    );
  }

  render() {
    const users = this.props.users.map(this.userListItem);

    return (
      <div className="users_list">
        <h3>Users List</h3>
        <img
          src="http://blackcommerce.org/eagleawards/wp-content/uploads/2014/03/divider-51.png"
          className="divider"
        />
        <ul>{users}</ul>
        <p>
          <Link to="/users/new">Register New User</Link>
        </p>
      </div>
    );
  }
}

export default User;