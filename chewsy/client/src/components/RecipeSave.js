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
// This file is from client/components forlder.//
//                                             //
/////////////////////////////////////////////////
// Anatoliy added this dummy file.       022018//
// to keep debugger quiet...                   //
/////////////////////////////////////////////////

import React, { Component } from "react";
// import { Link } from "react-router-dom";

class RecipeSave extends Component {
  constructor(props) {
    super(props);

    this.state={}

  }

  // componentDidMount() {
  // }


  render() {

    const recipeDatum = this.props.recipeDatum;

    console.log(recipeDatum);

    // user id has to be passed here to be saved within
    // "recipes_user" DB table, field "user_id"...
    const id = 1;

    // Math.floor(Math.random() * 100);

    const saveDatum = {
                        user_id: id,
                        recipe_uri: recipeDatum.uri,
                        recipe_url: recipeDatum.url,
                        recipe_img_url: recipeDatum.image,
                        recipe_label: recipeDatum.label,
                        recipe_hlth_lbl: recipeDatum.healthlabels,
                        recipe_comment: "*",
                        recipe_rating: 5,
                      };

    // this.setState(prevState => {
    //   prevState = saveDatum;
    //   return prevState;
    // });

    return (
      <div>

        
      </div>
    );
  }
}

export default RecipeSave;