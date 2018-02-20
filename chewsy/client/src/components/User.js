import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import UserReg from './UserReg';
import axios from 'axios';

class User extends Component {
  constructor(props) {
    super(props);

    // console.log(props);

    this.cheeseListItem = this.cheeseListItem.bind(this);
  }

  cheeseListItem(cheeseDatum, index) {
    const id = cheeseDatum.id;
    return (
      <div key={index}>
        <Link to={`/cheeses/${id}`}>{cheeseDatum.name}</Link>
      </div>
    );
  }

  render() {
    const cheeses = this.props.cheeses.map(this.cheeseListItem);

    return (
      <div className="M">
        <h1>Cheeses List</h1>
        <img
          src="http://blackcommerce.org/eagleawards/wp-content/uploads/2014/03/divider-51.png"
          className="divider"
        />
        <ul>{cheeses}</ul>
        <p>
          <Link to="/cheeses/new">Add A New Cheese</Link>
        </p>
      </div>
    );
  }
}

export default User;