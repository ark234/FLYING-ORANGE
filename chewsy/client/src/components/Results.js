import React, { Component } from 'react';
// import { Link } from "react-router-dom";

class ShowResults extends Component {
	constructor(props) {
		super(props);
    this.state ={
      
    }
    
	}
  componentDidMount(){
    this.setState({queryResults:this.props.results});
  }
	render() {
    
    console.log(this.state.queryResults);
		return (
          <div>
          
          </div>
      )
	}
}

export default ShowResults;
