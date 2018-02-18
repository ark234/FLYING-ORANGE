/////////////////////////////////////////////////
//                                             //
//    Project CHEWSY                           //
//    Flying Oranges Team at GA, New York      //
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


// TODO: add method for creating user...

usersModel.create = (req, res, next) => {

  console.log('In usersModel.create...');

  // Everything is expected to be prepopulated
  // and sanitized on the form...

  db
    .one(
      'INSERT INTO uesers (email, password_digest, counter, signedup_on, profiles_table) VALUES ($1, $2, $3, $4, $5) RETURNING id;',
      [
        req.body.email,
        req.body.password_digest,
        req.body.counter,
        req.body.signedup_on,
        req.body.profiles_table

      ]
    )
    .then(userId => {
      res.locals.newUserId = userId;

      console.log(res.locals.newUserId);

      next();
    })
    .catch(error => {
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

  // We should not allow to update anything else...
  // Please fill free to advise on this...
  // Good question: is digest affected by user's email?..  
  let { email, password_digest, counter, signedup_on, profiles_table } = req.body;

  db
    .one('UPDATE users SET email=$1, password_digest=$2, counter=$3, signedup_on=$4, profiles_table=$5 WHERE id=$6 RETURNING id;', 
    [
      email,
      password_digest,
      counter,
      signedup_on,
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

module.exports = usersModel;