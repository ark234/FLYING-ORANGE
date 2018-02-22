const db = require('../db/index.js');
const axios = require('axios');
const moment = require('moment');

const usersModel = {};

// TODO: add method for retrieving user
usersModel.getUser = (req, res, next) => {
	console.log('in usersModel.getUser!');
};

// TODO: add method for creating user
usersModel.create = (req, res, next) => {
	console.log('in usersModel.create!');
};

// TODO: add method for updating user
usersModel.update = (req, res, next) => {
	console.log('in usersModel.update!', req.body);

  const array = req.body.health;
  console.log(array);

  const userId = Number(req.body.user_id);

  const $array = [];
  const arrayVals = [userId];
  const arrayWhiteSpace = array.map(ele => ' ' +ele);
  const arrayMaped = array.map((ele, index )=>{
    $array.push(" $" + (index + 2));
    arrayVals.push(true);
    
    return ` ${ele} = $${index+2}`;
  });


  const arrayValsString = arrayVals.toString();console.log( arrayValsString);
  const arrayJoined = arrayMaped.join(',');
  const query = `INSERT INTO preferences ( user_id ,${arrayWhiteSpace}) VALUES ($1, ${$array}) ON CONFLICT (user_id) DO UPDATE SET ${arrayJoined};`;
  console.log(query);
  console.log('THIS IS THE ARRAY INSERT', arrayVals.length);
  db 
    .none(query,  arrayVals )
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

module.exports = usersModel;
