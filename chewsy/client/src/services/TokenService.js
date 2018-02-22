export default {
	// store token in localStorage under the 'authToken' key
	save(token) {
		window.localStorage.setItem('authToken', token);
	},

	// fetch the token out of localStorage
	read() {
		return window.localStorage.getItem('authToken');
	},

	// delete the token
	destroy() {
		window.localStorage.removeItem('authToken');
	}
};
