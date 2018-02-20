
// import { Link } from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';


class ShowResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.moreInfo = this.moreInfo.bind(this);
  }
  moreInfo(uri) {
    axios({
      url: "http://localhost:8080/recipes/moreInfo",
      method: "post",
      data: uri
    }).then(response => {
      console.log("POST FOR MORE INFO", response);
      this.props.history.push("/moreInfo");
    });
  }

  



  render() {
    const results = this.props.results;
        const resultsList = results.hits.map(recipeObject => {
          const recipeInfo = recipeObject.recipe;

          return (
            <div
              key={recipeInfo.uri}
              onClick={() => this.moreInfo(recipeInfo.uri)}
            >
              <h2>{recipeInfo.label}</h2>
              <h6>{recipeInfo.healthLabels}</h6>
              <img src={recipeInfo.image} width="100px" height="100px" />
            </div>
          )
        })

    return (<div>{resultsList}</div>);
}

}

export default ShowResults;
