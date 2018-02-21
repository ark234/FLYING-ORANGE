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
// This file is from controllers forlder...    //
//                                             //
/////////////////////////////////////////////////
// Anatoliy ... 												 022118//
/////////////////////////////////////////////////


import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from 'axios';

class RecipeInfo extends Component {
	constructor(props) {
		super(props);

		this.state={}

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

    const recipeDatum = this.props.recipeDatum;

    // That id should come from auth module/function...
    const id = 1;

    // Here we are repeating the same structure because
    // in "render()" function we cannot call this.setState...
    // Seems ugly, but works for now...

	  const svDtm = {
										user_id: id,
										recipe_uri: recipeDatum.uri,
										recipe_url: recipeDatum.url,
										recipe_img_url: recipeDatum.image,
										recipe_label: recipeDatum.label,
										recipe_hlth_lbl: recipeDatum.healthlabels,
										recipe_comment: "*",
										recipe_rating: 5,
	  							};

	  // Let us keep this for a while for testing purpose...
	  // var svDtm = {
			// 						user_id: id,
			// 						// recipe_uri: recipeDatum.uri,
			// 						recipe_uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_3921adf30bb0c9736b9ac30f447f8a63",
			// 						// recipe_url: recipeDatum.url,
			// 						recipe_url: "http://www.saveur.com/article/Recipes/Roast-Beef",
			// 						// recipe_img_url: recipeDatum.image,
			// 						recipe_img_url: "https://www.edamam.com/web-img/98a/98aa5d5cc0d88b28c2b9221a099b1a14.jpg",
			// 						// recipe_label: recipeDatum.label,
			// 						recipe_label: "Roast Beef",
			// 						// recipe_hlth_lbl: recipeDatum.healthlabels,
			// 						recipe_hlth_lbl: [
			// 											            "Sugar-Conscious",
			// 											            "Peanut-Free",
			// 											            "Tree-Nut-Free",
			// 											            "Alcohol-Free"
			// 											        ],
			// 						recipe_comment: "*",
			// 						recipe_rating: 5,
			// 					};

    this.setState(prevState => {
      prevState = svDtm;
      return prevState;
    });

    // We might need special treatment for data: this.state
    // in order to provide the material for saving in DB via
    // req.body...
    // Perhaps wrapping it in params might do the trick:
    // {params {...}}
    axios({
      url: "http://localhost:8080/recipes/save",
      method: "POST",
      data: this.state
      // data: this.state
      // url: "http://localhost:8080/api/recipes/save",
      // In Postman I have tested ...8080/recipes/save...
      // dropping the "api" part...


    }).then(response => {
      console.log("post successful, response.data:", response.data);

      // callback function to refresh the view inserted here...
      // we do not have such function ===this.props.queryRecipes();
      // Is /recipe/save is the right place to go?
      this.props.history.push("/recipes/save");
    });
  }

	render() {

	  const recipeDatum = this.props.recipeDatum;
	  console.log(recipeDatum);

	  // user id has to be passed here in oder to be saved within
	  // "recipes_user" DB table, field "user_id"...
	  const id = 1;

	  // Let us keep the testing material within the
	  // module for a while (commented out)...
	  // The rendered form below has been tested with
	  // these data...
	  const saveDatum = {
	  										user_id: id,
	  										recipe_uri: recipeDatum.uri,
	  										// recipe_uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_3921adf30bb0c9736b9ac30f447f8a63",
	  										recipe_url: recipeDatum.url,
	  										// recipe_url: "http://www.saveur.com/article/Recipes/Roast-Beef",
	  										recipe_img_url: recipeDatum.image,
	  										// recipe_img_url: "https://www.edamam.com/web-img/98a/98aa5d5cc0d88b28c2b9221a099b1a14.jpg",
	  										recipe_label: recipeDatum.label,
	  										// recipe_label: "Roast Beef",
	  										recipe_hlth_lbl: recipeDatum.healthlabels,
	  										// recipe_hlth_lbl: [
													// 				            "Sugar-Conscious",
													// 				            "Peanut-Free",
													// 				            "Tree-Nut-Free",
													// 				            "Alcohol-Free"
													// 				        ],
	  										recipe_comment: "*",
	  										recipe_rating: 5,
	  									};

	  console.log(saveDatum);
		
		const inputNames = ["user_id", 
												"recipe_uri", 
												"recipe_url",
												"recipe_img_url", 
												"recipe_label", 
												"recipe_hlth_lbl", 
												"recipe_comment", 
												"recipe_rating"
											 ];

		const displNames = ["User ID", 
												"Recipe Link(uri)", 
												"Recipe Source Link(url)", 
												"Recipe Image Link",
												"Recipe Name", 
												"Recipe Health Labels", 
												"Recipe Commentaries", 
												"Recipe Rating"];

    const inputs = inputNames.map((name, key) => {
      return (
        <div key={key}>
          <label htmlFor={name}>{displNames[key]}</label><br />
          <input
          	id={name}
            type="text"
            name={name}
            size="70"
            onChange={this.chngHandler}
            value={saveDatum[name]}
            // value={this.state[name]}
            // We do not expect user to make alterations on this form.
            // So, this.chngHandler might proove to be not very 
            // useful for saving input via this.state[]...
            // Is it possible to make it fire up on sbmtHandler, but
            // before it, and for the all fields?
          />
        </div>
      );
    });

		return (
			<div>
				<br />
				<h1>Recipe To Be Saved</h1>
				<br />
				<form onSubmit={this.sbmtHandler}>
          {inputs}
          <br />
          <input type="submit" value="Save Recipe" />
          <br />
        </form>
				
				<div>
					<br />
						<a href={saveDatum.recipe_url} alt="Link to Source">Follow Recipe Link</a>
					<br />
				</div>
				
			</div>
		);
	}
}

export default RecipeInfo;
