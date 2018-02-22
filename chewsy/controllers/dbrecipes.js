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
// LAI: recipesDBModel.getAllRecipes.    022118//
//      saved by a user...                     //
// LAI: recipesDBModel.destroy...        022218//
/////////////////////////////////////////////////

// Import dependencies
const router = require('express').Router();
// const recipesModel = require('../models/recipes.js');
const recipesDBModel = require('../models/dbrecipes.js');

// route for retrieving all recipes saved by user_":id" in DB...
router.get('/:id/savedRecipes', recipesDBModel.getAllRecipes, (req, res, next) => {
  res.json(res.locals.allRecipesDB);
});

// route for destroying of saved ":idRec" by user_":idUser" in DB...
router.get('/:idUser/savedRecipes/:idRec', recipesDBModel.destroy, (req, res, next) => {
  // res.json(res.locals.idRecDB);
  console.log('in DELETE at /:idUser/:idRec...');
  res.json({});
});

module.exports = router;
