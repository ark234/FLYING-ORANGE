import React, {Component} from 'react';
import Nav from './FixedNav';
import SearchField from './SearchField';
class Header extends Component{
constructor(props){
  super(props);
  this.state ={}
}

render(){

  return(
    <div>
    <Nav />
    <SearchField 
    routeToResults={this.props.routeToResults}
            isLoaded={this.props.isLoaded}
            errorForResponse={this.props.errorForResponse}
            getResponseData={this.props.getResponseData}
            errorFlag={this.props.errorFlag}
            loadingFlag={this.props.loadingFlag}/>
    </div>
    )
}

}


export default Header;