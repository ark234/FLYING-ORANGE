// Import dependencies
const router = require('express').Router();
const recipesModel = require('../models/recipes.js');

// route for retrieving recipes
router.post('/', recipesModel.getRecipes, (req, res, next) => {
	console.log('/ POST route hit!');
	res.json(res.locals.recipesData);
});

module.exports = router;
