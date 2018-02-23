import React, { Component } from "react";
import SearchField from "./SearchField";
import axios from 'axios';
import TokenService from '../services/TokenService';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.userId
    };
    this.healthArray = new Set();
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAccountEdit = this.handleAccountEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    //not sure if e.preventDefault() needs to be called
    const name = e.target.name;
    this.setState({[name]:e.target.value});
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


  editAccount(info){
    const payload = {...info, "user_id": this.props.userId};
    axios({
      url:'http://localhost:8080/users/editAccount',
      method:'put',
      data: payload,
      headers: {
        Authorization: `Bearer ${TokenService.read()}`
      }
    })
    .then( response =>{
      console.log('in response callback of UserProfile.editAccount axios call. response.data:', response.data);
      this.props.editTokenData(response.data);

    })
  }
 
  handleSubmit(e){
    e.preventDefault();
    const user_id = this.props.userId;
    const preferenceArray = Array.from(this.healthArray);
    this.edit(preferenceArray, user_id.id);
  }

  handleAccountEdit(e){
    e.preventDefault();
    //this.setState({user_id:this.props.userId})
    this.editAccount(this.state);
  }
  handleChange(e){
    const name = e.target.name;
    this.setState({[name]:e.target.value});
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
          
          </div>
        </form>
        <button>View Your Saved Recipes</button>

        <div className="edit-account">
        <form onSubmit={this.handleAccountEdit}>
          <h2>Edit Account Information</h2>
          <label>
          Enter New E - Mail:
          <input type='text' name ='email' onChange={this.handleChange}/>
          </label>
          
          <label>Enter New Password:
          <input type='password' name = 'password' onChange={this.handleChange}/>
          </label>
          <input type='submit' value='submit' />
        </form>
        </div>

        <button>Log Out</button>
      </div>
    );
  }
}

export default UserProfile;
