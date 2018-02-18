import React, { Component } from "react";
// import { Link } from "react-router-dom";

class ShowResults extends Component {
  constructor(props) {
    super(props);
    this.recipeResults = this.recipeResults.bind(this);
  }

  recipeResults(recipeDatum, index) {
    // const recipeDatum = this.props.recipeDatum;
    const index = this.props.index;
    const recipeName = recipeDatum.label;
    const recipeImage = recipeDatum.image;
    const healthLabels = recipeDatum.healthLabels;
    const servings = recipeDatum.yield;
    const calories = recipeDatum.calories;
    return (
      <div>
        recipeDatum={recipeDatum}
        index={index}
        queryRecipe={this.props.queryRecipe}
      </div>
    );
  }

  render() {
    //grid/flex box to have these recipes displayed in 3 columns
    //recipeDatum = data.hits.recipe
    //const recipeName = data.hits.recipe.index.label;
    const recipes = this.props.recipes.map(this.recipeResults);

    return (
      <div>
        <h2>#CountofResults Matching Results for #FoodType</h2>
        <div>
          <h2>{recipeImage}</h2>
          <h2>{recipeName}</h2>
          <h2>{healthLabels}</h2>
          <h2>{servings}</h2>
          <h2>{calories}</h2>
        </div>
      </div>
    );
  }
}

export default ShowResults;
