import React, { Component } from "react";
import SearchField from "./SearchField";
import axios from './axios';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.healthArray = new Set();
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.edit = this.edit.bind(this);
  }
  handleChangeCheckbox(event) {
    const value = event.target.value;

    if (this.healthArray.has(value)) {
      console.log("ifStatement");

      this.healthArray.delete(value);
    } else {
      console.log("elseStatement");
      this.healthArray.add(value);
    }
    const healthArray = Array.from(this.healthArray);
    this.setState({ health: healthArray });
  }

  edit(info, user_id){
    axios({
      url: 'localhost:8080/users/preferences',
      method: 'put',
      data: {health: info, user_id: user_id }
    })
    .then(response =>{
      console.log('PUT response', response);
    })
  }
 
  handleSubmit(e){
    e.preventDefault();
    const preferenceArray = Array.from(this.healthArray);
    this.edit(preferenceArray, user_id);

  }

  render() {
    const allergens = [
      "crustacean-free",
      "shellfish-free",
      "soy-free",
      "dairy-free",
      "egg-free",
      "fish-free",
      "gluten-free",
      "kosher",
      "lupine-free",
      "peanut-free",
      "pork-free",
      "red-meat-free",
      "vegan",
      "tree-nut-free",
      "wheat-free"
    ];

    const checkBoxes = allergens.map((allergen, i) => {
      return (
        <div key={i}>
          <label>
            {allergen}:
            <input
              className="checkBox"
              onChange={this.handleChangeCheckbox}
              type="checkbox"
              name="health"
              value={allergen}
              id={allergen}
            />
          </label>
        </div>
      );
    });

    return (
      <div>
        <h2>User_Name</h2>
        <div>User Dietary and Allergen Preferences</div>
        <form onSubmit={this.handleSubmit}>
          <div className="checkBoxContainer">
            <h2>Allergens</h2>
            {checkBoxes}
          </div>
        </form>
        <button>View Your Saved Recipes</button>

        <div class="edit-account">
          <h2>Edit Account Information</h2>
          <h3>User_Name</h3>
          <h3>hange Email</h3>
          <h3>Change Password</h3>
        </div>

        <button>Log Out</button>
      </div>
    );
  }
}

export default UserProfile;
