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
// This file is from models forlder...         //
//                                             //
/////////////////////////////////////////////////

// LAI: recipesDBModel.getAllRecipes...  022118//
// LAI: recipesDBModel.destroy...        022218//

const db = require('../db/index.js');
const axios = require('axios');
const dotenv = require('dotenv').config();

const recipesDBModel = {};

// middleware to fetch all DB records from "recipes_user" table...

recipesDBModel.getAllRecipes = (req, res, next) => {
	console.log('inside recipesDBModel.getAllRecipes');
	const curr_id = req.params.userId;
	console.log('user_id: ', curr_id);

	db
		.manyOrNone('SELECT * FROM recipes_user WHERE user_id=$1', [curr_id])

		.then(allRecipesDB => {
			res.locals.allRecipesDB = allRecipesDB;

			console.log(res.locals.allRecipesDB);

			next();
		})
		.catch(error => {
			console.log('Error: in recipesDBModel.detAllRecipes. Details: ', error);
			next(error);
		});
};

// middleware to delete record ":idRec", owned by ":idUser"
// in "recipes_user" table...

recipesDBModel.destroy = (req, res, next) => {
	db.none('DELETE FROM recipes_user WHERE id=$1;', [req.params.idRec]).catch(error => {
		console.log('Error: in recipesDBModel.destroy. Details: ', error);
		next(error);
	});
};

module.exports = recipesDBModel;
