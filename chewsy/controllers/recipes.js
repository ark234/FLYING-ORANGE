// Import dependencies
const router = require('express').Router();
const recipesModel = require('../models/recipes.js');

// route for retrieving recipes
router.post('/', recipesModel.getRecipes, (req, res, next) => {
	console.log('/ POST route hit!');
	res.json(res.locals.recipesData);
});

// route for retrieving detailed recipe information
router.post('/moreInfo', recipesModel.getMoreInfo, (req, res, next) => {
	console.log('/moreInfo POST route hit!');
	console.log('res.locals:', res.locals);
	res.json(res.locals.moreInfoData);
});

module.exports = router;
