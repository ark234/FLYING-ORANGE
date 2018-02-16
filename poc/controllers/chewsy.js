// Import dependencies
const chewsyModel = require('../models/chewsy.js');
const router = require('express').Router();

// Import auth
// const auth = require('../services/auth.js');

router.get(
	'/',
	// auth.restrict, // Middleware that redirects unauthenticated users to login
	chewsyModel.getFood,
	(req, res, next) => {
		console.log('/ route hit');
		res.json(res.locals.foodData);
	}
);

module.exports = router;
