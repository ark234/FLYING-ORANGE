import React, { Component } from 'react';
import logo from './orange.png';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { foodData: [], isLoaded: false };
	}

	getData() {
		// axios.get('')
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Chewsy</h1>
				</header>
			</div>
		);
	}
}

export default App;
