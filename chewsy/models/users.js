const db = require('../db/index.js');
const axios = require('axios');
const moment = require('moment');
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
const pgp = require('pg-promise')();
// TODO: add method for retrieving user
usersModel.getUser = (req, res, next) => {
	console.log('in usersModel.getUser!');
};

// TODO: add method for creating user
usersModel.create = (req, res, next) => {
	console.log('in usersModel.create!');
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
};

// TODO: add method for deleting user
usersModel.destroy = (req, res, next) => {
	console.log('in usersModel.destroy!');
};

usersModel.updateAccount = (req, res, next) =>{
  console.log('IN usersModel.updateAccount');

  const password_digest = bcrypt.hashSync(req.body.password, 10);
  const email = req.body.email;

  db
    .none('UPDATE users SET email = $1, password_digest= $2 WHERE user.id = $3', [email, password_digest, user_id])
    .then( response=>{
      console.log('WE MADE IT');
    })

}

module.exports = usersModel;
