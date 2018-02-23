/////////////////////////////////////////////////
//                                             //
//    Project CHEWSY                           //
//    Flying Orange Team at GA, New York       //
//    February, 2018                           //
//                                             //
//    Instructors:                             //
//        Tims Gardner                         //
//        Drake Tally                          //
//        Dominic Farquharson                  //
//                                             //
/////////////////////////////////////////////////
//                                             //
// This file is from controllers directory...  //
//                                             //
/////////////////////////////////////////////////

const router = require('express').Router();
const recipesDBModel = require('../models/dbrecipes.js');
const usersModel = require('../models/users.js');
const TokenService = require('../services/TokenService');
const authService = require('../services/AuthService');

// TODO: define GET request for '/' to retrieve all users...
router.get('/', usersModel.getAllUsers, (req, res, next) => {
	console.log('In router.get, usersModel.getAllUsers...');

	res.json(res.locals.allUsers);
});

// TODO: define GET request for '/:id' to retrieve user...
router.get('/:id', usersModel.getUserById, (req, res) => {
	console.log('In router.get, usersModel.getUser...');
	// const user = res.locals;
	// console.log('User data: ', user);
	console.log('User data: ', res.locals.user);

	res.json(res.locals.user);
});

// POST to '/users/register' to create user...
router.post('/register', usersModel.create, (req, res) => {
	console.log('registration success! user:', res.locals.user);
	console.log('user preferences:', res.locals.prefs);
	console.log('token:', res.locals.token);
	res.json({ token: res.locals.token, user: res.locals.user, prefs: res.locals.prefs });
});

router.put('/preferences', usersModel.updatePreferences);

router.put('/editAccount', usersModel.updateAccount);

// POST to '/users/login' to login...
// if the user didn't get created thrown an error
// else include the user and token in the response
router.post('/login', usersModel.login, (req, res) => {
	console.log('POSTing to /users/login.');
	if (!res.locals.user) {
		res.status(401).json({ err: 'Login Failed' });
	} else {
		console.log('login success! user:', res.locals.user);
		console.log('user preferences:', res.locals.prefs);
		console.log('token:', res.locals.token);
		res.json({ token: res.locals.token, user: res.locals.user, prefs: res.locals.prefs });
	}
});

// TODO: define DELETE request for '/:id' to delete user...
router.delete('/:id', usersModel.destroy, (req, res) => {
	console.log('In router.delete, usersModel.destroy...');

	res.json({});
});

// route for retrieving all recipes saved by user_":id" in DB...
router.get(
	'/:userId/savedRecipes',
	authService.restrict(),
	recipesDBModel.getAllRecipes,
	(req, res, next) => {
		res.json(res.locals.allRecipesDB);
	}
);

// route for destroying of saved ":idRec" by user_":idUser" in DB...
router.get('/:idRec', recipesDBModel.destroy, (req, res, next) => {
	// res.json(res.locals.idRecDB);
	console.log('in DELETE at /:idUser/:idRec...');
	res.json({});
});

module.exports = router;
