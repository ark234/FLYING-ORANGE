/////////////////////////////////////////////////
//                                             //
//    Project CHEWSY                           //
//    Flying Orange Team at GA, New York       //
//    February, 2018                           //
//                                             //
//    Instructors:                             //
//        Tims Gardner                         //
//        Drake Tally                          //
//        Dominic Farquharson                  //
//                                             //
/////////////////////////////////////////////////
//                                             //
// This file is from controllers forlder...    //
//                                             //
/////////////////////////////////////////////////
// Anatoliy added recipesModel.create... 022018//
/////////////////////////////////////////////////

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

// router for saving recipe in our DB = create new record...
router.post('/save', recipesModel.create, (req, res, next) => {
    
    console.log(res.locals.newRecipeId);
    res.json(res.locals.newRecipeId);
    // res.render('/moreInfo:id', res.locals.newRecipeId);
    
});


module.exports = router;
