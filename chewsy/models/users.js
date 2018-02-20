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
//    This file is from models directory...    //
//                                             //
/////////////////////////////////////////////////

const db = require('../db/index.js');
const axios = require('axios');
const moment = require('moment');

// We'll also need bcrypt to authenticate users
// without storing their passoword _anywhere_...
const bcrypt = require('bcryptjs');

const usersModel = {};

// TODO: add method for retrieving users...

usersModel.getAllUsers = (req, res, next) => {
	console.log('in usersModel.getAllUsers...');

	db
		.manyOrNone('SELECT * FROM users')
		.then(data => {
			res.locals.allUsers = data;
			next();
		})
		.catch(error => {
			console.log('Error: in usersModel.getAllUsers. Details: ', error);
			next(error);
		});
};

usersModel.updateLogin = (req, res, next) => {
	console.log('In usersModel.updateLogin...');

	console.log('req.body:', req.body);

	let { email, password_digest } = req.body;

	const passwDigest = bcrypt.hashSync(req.body.password_digest, 10);

	db
		.one('UPDATE users SET counter=$1 WHERE email=$2 AND password_digest=$3 RETURNING id;', [
			1,
			email,
			passwDigest
		])
		.then(userId => {
			res.locals.userId = userId;
			next();
		})
		.catch(error => {
			// There supposed to be an arror for non-unique email...

			console.log('Error: in usersModel.update. Details: ', error);
			next(error);
		});
};

// TODO: add method for creating user...

usersModel.create = (req, res, next) => {
	console.log('In usersModel.create...');

	// This method is supposed to handle sign up for
	// a new user...

	// This is where we obtain the hash of the user's password...
	const passwDigest = bcrypt.hashSync(req.body.password_digest, 10);

	// The req.body.counter should be set to 1 as an indicaton
	// of active session... No re-login here...

	// Making sure that req.body.signedup_on is a valid
	// timestamp...
	const signOn = moment().unix();

	// The req.body.profiles_table field gets
	// proper current value of "profiles"...
	const profTable = 'profiles';

	db
		.one(
			'INSERT INTO uesers (email, password_digest, counter, profiles_table) VALUES ($1, $2, $3, $4) RETURNING id;',
			[req.body.email, passwDigest, 1, profTable]
		)
		.then(userId => {
			res.locals.newUserId = userId;
			console.log('pg-promise result data:', res.locals.newUserId);

			next();
		})
		.catch(error => {
			// There supposed to be an error in case the email
			// is not unique...
			console.log('Error: in usersModel.create. Details: ', error);
			next(error);
		});
};

usersModel.getUser = (req, res, next) => {
	console.log('in usersModel.getUser...');

	const id = req.params.id;
	console.log(`User's id is: ${id}...`);

	db
		.oneOrNone('SELECT * FROM users WHERE id = $1', [id])
		.then(data => {
			res.locals.user = data;
			next();
		})
		// .catch(err => console.log(error));
		.catch(error => {
			console.log('Error: in usersModel.getUser. Details: ', error);
			next(error);
		});
};

// TODO: add method for updating user...

usersModel.update = (req, res, next) => {
	console.log('in usersModel.update...');

	console.log('req.body:', req.body);

	// We should not allow to update anything except:
	// "profiles_table" field...
	// Even changing the email is problematic...
	// If a counter indicates an active session, there
	// supposed to be forced logout/login with the new
	// credentials... Delete user would be a better way...
	let { email, password_digest, counter, signedup_on, profiles_table } = req.body;

	db
		.one('UPDATE users SET profiles_table=$1 WHERE id=$2 RETURNING id;', [
			profiles_table,
			req.params.id
		])
		.then(userId => {
			res.locals.userId = userId;
			next();
		})
		.catch(error => {
			// There supposed to be an arror for non-unique email...

			console.log('Error: in usersModel.update. Details: ', error);
			next(error);
		});
};

// TODO: add method for deleting user

usersModel.destroy = (req, res, next) => {
	// What are the consiquencies of that?
	// Is any user would be able to delete
	// any other user?

	// On the list of all users it might be
	// prevented by not allowing to destroy
	// anyone except the current user...

	console.log('in usersModel.destroy...');

	db.none('DELETE FROM users WHERE id=$1;', [req.params.id]).catch(error => {
		console.log('Error: in usersModel.destroy. Details: ', error);
		next(error);
	});
};

module.exports = usersModel;
