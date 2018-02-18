// Import dependencies
const router = require('express').Router();
const recipesModel = require('../models/recipes.js');

router.post('/', (req, res, next) => {
	console.log('Post / route hit');
});

module.exports = router;
