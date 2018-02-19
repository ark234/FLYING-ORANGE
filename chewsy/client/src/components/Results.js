import React, { Component } from 'react';
// import { Link } from "react-router-dom";

class ShowResults extends Component {
	constructor(props) {
		super(props);
    this.state ={
      
    }
    
	}
  
	render() {
    const results = this.props.results;
    const resultList = results.hits.map( recipeObj =>{
      return(
          <div key = {recipeObj.recipe.uri}>
          <h2>{recipeObj.recipe.label}</h2>
          </div>
        )
    });
    console.log(results);
		return (
          <div>
          {resultList}
          </div>
      )
	}
}

export default ShowResults;
