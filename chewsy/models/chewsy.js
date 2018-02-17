const db = require('../db/index.js');
const axios = require('axios');
const moment = require('moment');

const chewsyModel = {};

chewsyModel.getFood = (req, res, next) => {
	console.log('hello from chewsyModel.getFood.');
};

module.exports = chewsyModel;
