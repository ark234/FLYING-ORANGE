import React, { Component } from 'react';
import axios from 'axios';
import UserForm from './UserForm';


class Login extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    this.props.submit(data);
  }

  render(){

    return(
      <div  className='modal'>
      <h1>Login</h1>
      <UserForm submit={this.onSubmit}/>
      <button onClick={()=>this.props.toggleLogin()}>Back Home</button>
      </div>
      )
  }

}



export default Login;
