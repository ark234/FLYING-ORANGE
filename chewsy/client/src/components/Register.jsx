import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){

    return(
      <div onClick={()=>this.props.toggleSignUp()}className='modal'>
      Register
      </div>
      )
  }

}



export default Register;
