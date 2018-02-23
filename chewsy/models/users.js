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
const pgp = require('pg-promise')();
const axios = require('axios');
const moment = require('moment');
const TokenService = require('../services/TokenService');
// We'll also need bcrypt to authenticate users
// without storing their passoword _anywhere_...
const bcrypt = require('bcryptjs');

const usersModel = {};
const allergyNames = [
  'balanced       ',
  'high_fiber     ',
  'high_protein   ',
  'low_carb       ',
  'low_fat        ',
  'low_sodium     ',
  'alcohol_free   ',
  'celery_free    ',
  'crustacean_free',
  'dairy_free     ',
  'egg_free       ',
  'fish_free      ',
  'gluten_free    ',
  'kidney_friendly',
  'kosher         ',
  'low_potassium  ',
  'lupine_free    ',
  'mustard_free   ',
  'no_oil_added   ',
  'low_sugar      ',
  'paleo          ',
  'peanut_free    ',
  'pescatarian    ',
  'pork_free      ',
  'red_meat_free  ',
  'sesame_free    ',
  'shellfish_free ',
  'soy_free       ',
  'sugar_conscious',
  'tree_nut_free  ',
  'vegan          ',
  'vegetarian     ',
  'wheat_free     '
].map(name => name.trim());

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

// helper method used in login
usersModel.findByEmail = email => {
	return db.one('SELECT * FROM users WHERE email = $1;', [email]);
};
// helper method used in login
usersModel.getPrefs = userId => {
	return db.one('SELECT * FROM preferences WHERE user_id = $1;', [userId]);
};

// method for login...
usersModel.login = (req, res, next) => {
	console.log('In usersModel.login...');
	const user = req.body;
	// console.log('user:', user);
	// do the normal dance comparing password / password_digest
	usersModel
		.findByEmail(user.email)
		.then(data => {
			const isAuthed = bcrypt.compareSync(user.password, data.password_digest);
			if (!isAuthed) {
				next();
			}

			// remove password from response object
			const { password_digest, ...userData } = data;

			usersModel.getPrefs(userData.id).then(prefData => {
				res.locals.user = userData;
				res.locals.prefs = prefData;

				const tokenData = {
					id: data.id,
					email: data.email,
					prefData
				};

				// and pass it into makeToken
				TokenService.makeToken(tokenData)
					.then(token => {
						res.locals.token = token; // set the token on res.locals
						next();
					})
					.catch(err => {
            console.log('*error in userModel.login, err:', err);
						next(err);
					});
			}).catch(err => {
        console.log('**error in userModel.login, err:', err);
        next(err);
      });
		})
		.catch(err => {
      console.log('error in userModel.login, err:', err);
			next(err);
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
			// insert entry into profiles table with default values for new user
			db
				.one('INSERT INTO preferences (user_id) VALUES ($1) RETURNING *;', [data.id])
				.then(prefData => {
					// remove the password_digest since it's sensitive
					const { password_digest, ...userData } = data;
					res.locals.user = userData;
					res.locals.prefs = prefData;
					// console.log('PREF DATA====>', prefData);
					const tokenData = {
						id: userData.id,
						email: userData.email,
						prefData
					};

					// pass some bit of data into makeToken
					TokenService.makeToken(tokenData)
						.then(token => {
							// console.log(token);
							res.locals.token = token; // pass the token into res.locals
							next(); // calling next()
						})
						.catch(next); // call next with error object
				})
				.catch(err => console.log('error inserting into preferences table:', err));
		})
		.catch(err => {
			console.log(`User Create failed: ${err}`);
			next();
		});
};


// TODO: add method for updating user
usersModel.updatePreferences = (req, res, next) => {
	console.log('in usersModel.update! req.body:', req.body);

  // const array = req.body.health;
  // console.log(array);

  const userId = req.body.user_id;

  const valueArray = allergyNames.map(name => {
   return req.body.health.includes(name); 
  });

  const query = 'UPDATE preferences SET (${allergies:name})=(${values:csv}) WHERE user_id=${userId} RETURNING *';
  
  const finalQuery = pgp.as.format(query, 
  {allergies: allergyNames, // array of strings
  userId: userId, // number
  values: valueArray // array of booleans
});
  
  db 
    .one(finalQuery)
    .then(data=>{
      console.log('+++THE DATA++++', data);
      next();
    })
    .catch(error => {
            console.log('***CHECK OUT THIS AWSOME ERROR', error);
        });
  }

usersModel.getUserById = (req, res, next) => {
	console.log('in usersModel.getUserById...');

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

usersModel.updateAccount = (req, res, next) =>{
  console.log('----------------------------');
  console.log('IN usersModel.updateAccount');

  const password_digest = bcrypt.hashSync(req.body.password, 10);
  const email = req.body.email;
  const user_id = req.body.user_id;

  db
    .none('UPDATE users SET email = $1, password_digest= $2 WHERE users.id = $3', [email, password_digest, user_id])
    .then( response=>{
      console.log('WE MADE IT');
    })
    .catch(err => {
      console.log('error encountered in usersModel.updateAccount pg-promise call. error:', err);
      console.log('query:', pgp.as.format('UPDATE users SET email = $1, password_digest= $2 WHERE users.id = $3', [email, password_digest, user_id]));
      next(err);
    })

}

module.exports = usersModel;
