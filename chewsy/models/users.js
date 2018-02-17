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
	console.log('in usersModel.update!');
};

// TODO: add method for deleting user
usersModel.destroy = (req, res, next) => {
	console.log('in usersModel.destroy!');
};

module.exports = usersModel;
