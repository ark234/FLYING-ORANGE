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

// bcryptjs incorporates "sult" to protect against
// rainbow table attacks...
// Makes itself slower to remain resistant to
// brute-force search attacks while computational
// power increasing...
// Max input is 72 bytes, generated hashes are 
// 60 char...
// On node.js the built-in crypto module's 
// randomBytes interface is used for secure
// random numbers...

const db = require('../db/index.js');
const axios = require('axios');
const moment = require('moment');

const bcrypt = require('bcryptjs');

const usersModel = {};

/////////////////////////////////////////////////
//      This is NOT a middleware...            //
//  Need to synchronize with services/auth.js  //
//           regarding user/users              //
/////////////////////////////////////////////////
usersModel.createNotMW = function createNotMW(user) {

  console.log('In createNotMW...');

  // This is where we obtain the hash of the user's password.
  const passwordDigest = bcrypt.hashSync(user.password, 10);

  // Generally we try to avoid passing promises around, but here 
  // LocalStrategy's interface means we can't just rely on next() 
  // to glide us to the next thing we want to do. So we'll 
  // return the callback...
  // To see how it's used, refer to passport.use('local-strategy',
  // ...) in services/auth.js...

  // We make an entry in the database for the new
  // user. We set the counter to 0 initially.

  // We do NOT store the password in the database!
  // Instead we store the password digest, which is a "salted"
  // hash of the password.
  // If someone grabs the password digest it won't tell them
  // what the password is, but we can use the password digest 
  // to verify if a submitted password is correct.
  // This is the magic of hashes...

  return db.oneOrNone(
      'INSERT INTO users (email, password_digest, counter, signedup_on, profiles_table) VALUES ($1, $2, $3, $4, $5) RETURNING *;', 
      [user.email, passwordDigest, 0, moment().unix(), 'profiles']
  );
};

// We need both a middleware AND a NON-middleware version 
// (non-middleware for use in services/auth.js)...

// Again, LocalStrategy's interface means it's easiest to
// return a promise here...

// findByEmailNotMW will be used in findByEmailMW
// a few lines down...
usersModel.findByEmailNotMW = function findByEmailNotMW(email) {

  console.log('In findByEmailNotMW...');

  return db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email]);

};

// Is that an equivalent of "users/:id" ?..
usersModel.findByEmailMW = function findByEmailMW(req, res, next) {
  console.log('In findByEmailMW...');
  const email = req.user.email;
  // Here we're using the NON-middleware version above,
  // getting back a promise...
  usersModel
    .findByEmailNotMW(email) 
    .then((userData) => {
        res.locals.userData = userData;
        next();
    }).catch(err => console.log('Error: in usersModel.findByEmailNotMW. Details: ', err)
    );
};

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


// TODO: add method for creating user...
/////////////////////////////////////////////////
//      We are not creating a user this way    //
//      if services/auth.js is implemented.    //
//      Have we decided on this yet?           //
/////////////////////////////////////////////////
// usersModel.create = (req, res, next) => {

//   console.log('in usersModel.create...');

//   // Everything is expected to be prepopulated
//   // and sanitized on the form...


//   db
//     .one(
//       'INSERT INTO uesers (email, password_digest, counter, signedup_on, profiles_table) VALUES ($1, $2, $3, $4, $5) RETURNING id;',
//       [
//         req.body.email,
//         req.body.password_digest,
//         req.body.counter,
//         req.body.signedup_on,
//         req.body.profiles_table

//       ]
//     )
//     .then(userId => {
//       res.locals.newUserId = userId;

//       console.log(res.locals.newUserId);

//       next();
//     })
//     .catch(error => {
//       console.log('Error: in usersModel.create. Details: ', error);
//       next(error);
//     });
// };

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

  // We should not allow to update anything else...
  // Please fill free to advise on this...
  // Good question: is digest affected by user's email?..  
  let { email, profiles_table } = req.body;

  db
    .one('UPDATE users SET email=$1, profiles_table=$2 WHERE id=$3 RETURNING id;', [
      email,
      profiles_table,
      req.params.id

    ])
    .then(userId => {
      res.locals.userId = userId;
      next();
    })
    .catch(error => {
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

  db
  .none('DELETE FROM users WHERE id=$1;', [req.params.id])
  .catch(error => {
    console.log('Error: in usersModel.destroy. Details: ', error);
    next(error);
  });
};

/////////////////////////////////////////////////
//                                             //
//     This section is for demonstration.      //
//                                             //
/////////////////////////////////////////////////

// Middleware can be built for the user/users model 
// and talk to the database as usual... 
// Now we have access to req.user for user information,
// thanks to passport...
usersModel.incrUserCounter = function incrUserCounter(req, res, next) {
    // Get the user counter number...
    db.one(
        'UPDATE users SET counter = counter + 1 WHERE email = $1 RETURNING counter', [req.user.email]
    ).then((counterData) => {
        res.locals.counterData = counterData;
        console.log(res.locals.counterData);
        next();
    }).catch(err => console.log('Error: in incrUserCounter. Details: ', err));
};

module.exports = usersModel;
