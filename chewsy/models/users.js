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

// TODO: NEED TO REWRITE THIS METHOD FOR LOGIN. PERHAPS SEND A BOOL VAL
// THAT CAN BE PERSISTED IN SESSION STORAGE
usersModel.login = (req, res, next) => {
	console.log('In usersModel.login...');

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

// method for creating user...

usersModel.create = (req, res, next) => {
	console.log('In usersModel.create...');
	const user = req.body;

	// This is where we obtain the hash of the user's password...
	const passwordDigest = bcrypt.hashSync(user.password, 10);

	db
		.one('INSERT INTO users (email, password_digest) VALUES ($1, $2) RETURNING *;', [
			user.email,
			passwordDigest
		])
		.then(data => {
			// remove the password_digest since it's sensitive
			const { password_digest, ...userData } = data;
			res.locals.user = userData;
			const tokenData = {
				id: userData.id,
				email: userData.email
			};

			// pass some bit of data into makeToken
			TokenService.makeToken(tokenData)
				.then(token => {
					console.log(token);
					res.locals.token = token; // pass the token into res.locals
					next(); // calling next()
				})
				.catch(next); // call next with error object
		})
		.catch(err => {
			console.log(`User Create failed: ${err}`);
			next();
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
