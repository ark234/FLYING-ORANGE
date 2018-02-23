const bcrypt = require('bcryptjs');
const TokenService = require('./TokenService');
const User = require('../models/users');

// boilerplate stuff
// just remember to always call next
function restrict() {
	// a bit of a wonky syntax
	// the gist is that the middleware expands into
	// calling verify with the token service
	// and then cathces any errors that arise and sends out a 401
	// response code
	return [
		(req, res, next) =>
			TokenService.verify(req.authToken)
				.then(data => {
					next();
				})
				.catch(next), // a little goofy but next() is getting called with an error object

		(err, req, res, next) => {
			console.log(`err: ${err}`);
			res.status(401).json({});
		}
	];
}

function isLoggedIn(req, res, next) {
	TokenService.verify(req.authToken)
		.then(data => {
			console.log('DATA ===>', data);
			res.locals.isLoggedIn = true;
			res.locals.tokenData = data;
			next();
		})
		.catch(err => {
			res.locals.isLoggedIn = false;
			next(err);
		});
}

module.exports = {
	restrict,
	isLoggedIn
};
