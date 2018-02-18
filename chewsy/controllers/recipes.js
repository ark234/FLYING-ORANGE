// Import dependencies
const router = require('express').Router();
const recipesModel = require('../models/recipes.js');

router.post('/', recipesModel.getFood, (req, res, next) => {
	console.log('Post / route hit');
});

module.exports = router;
