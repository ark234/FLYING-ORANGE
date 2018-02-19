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
// This file is from controllers directory...  //
//                                             //
/////////////////////////////////////////////////


const router = require('express').Router();

const usersModel = require('../models/users.js');

/////////////////////////////////////////////////
// As a reminder: we are not using passport here
// const passport = require('passport');
// const auth = require('../services/auth');
/////////////////////////////////////////////////
// This has not been done in index.js... 
// Do we need it here?
// 
// router.get('/', (req, res, next) => {
//     res.redirect('users/profile');
// });
/////////////////////////////////////////////////

console.log('Loading controllers/users...');

// TODO: define GET request for '/' to retrieve all users...
router.get('/', usersModel.getAllUsers, (req, res, next) => {

  console.log('In router.get, usersModel.getAllUsers...');

  res.json(res.locals.allUsers);

});

// TODO: define GET request for '/:id' to retrieve user...
router.get("/:id", usersModel.getUser, (req, res) => {

  console.log('In router.get, usersModel.getUser...');
  // const user = res.locals;
  // console.log('User data: ', user);
  console.log("User data: ", res.locals.user);

  res.json(res.locals.user);
});

// TODO: define POST request for '/' to create user...
router.post('/', usersModel.create, (req, res, next) => {

  // This route is supposed to handle sign up for
  // a new user...

  console.log('In router.post, usersModel.create...');
    
    console.log(res.locals.newUserId);

    res.json(res.locals.newUserId);
});

router.post('/', usersModel.updateLogin, (req, res, next) => {

  // This route is supposed to handle login for
  // a user...

  // Expected that entered email and password would
  // be compared against DB table "users", and then
  // "counter" increased to 1 to indicate active 
  // session...

  console.log('In router.post, usersModel.create...');
    
    console.log(res.locals.newUserId);

    res.json(res.locals.newUserId);
});

// TODO: define PUT request for '/:id' to update user...
router.put('/:id', usersModel.update, (req, res) => {

  console.log('In router.put, usersModel.update...');

  console.log('res.locals: ', res.locals);
  res.json(res.locals.userId);
});

// TODO: define DELETE request for '/:id' to delete user...
router.delete('/:id', usersModel.destroy, (req, res) => {

  console.log('In router.delete, usersModel.destroy...');
  
  res.json({});

});


module.exports = router;