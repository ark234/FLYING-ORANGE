// import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";
import "../App.css";

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
      data: { uri }
    }).then(response => {
      console.log("POST FOR MORE INFO", response);
      this.props.history.push("/moreInfo");
    });
  }

  render() {
    const results = this.props.results;
    const resultsList = results.hits.map((recipeObject, index) => {
      const recipeInfo = recipeObject.recipe;

      return (
        <div className="recipeResultsContainer">
          <div className="recipe-card">
            <h3 className="viewRecipe">View</h3>
            <div
              key={recipeInfo.uri}
              onClick={() => {
                this.props.moreInfo(recipeInfo);
                this.props.history.push(`/moreInfo/${index + 1}`);
              }}
            >
              <img src={recipeInfo.image} className="recipeResultsImg" />
              <h2 className="recipeName">{recipeInfo.label}</h2>
              <h6 className="healthLabels">{recipeInfo.healthLabels}</h6>
              <h6 className="servings">{recipeInfo.yield} servings</h6>
              <h6 className="calories">
                {Math.trunc(recipeInfo.calories)} calories
              </h6>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="results-header">
          Found {results.count} matching results for {results.q}
        </div>
        <div className="test">{resultsList}</div>
      </div>
    );
  }
}

export default ShowResults;
