const db = require('../db/index.js');
const axios = require('axios');
const moment = require('moment');

const recipesModel = {};

recipesModel.getRecipes = (req, res, next) => {
	console.log('in recipesModel.getRecipes!');
};

module.exports = recipesModel;
