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
//    This file is from chewsy directory...    //
//                                             //
/////////////////////////////////////////////////

// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const cors = require('cors');
const tokenService = require('./services/TokenService');
const authService = require('./services/AuthService');

const PORT = process.env.PORT || 8080;

// Configure app
const app = express();

// Setup cors to allow front end
app.use(cors());

// Set up morgan
app.use(morgan('dev'));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// this will parse the incoming token as a middleware
app.use(tokenService.receiveToken);

// Start server
app.listen(PORT, () => {
	console.log('Server started on port', PORT);
});

// Hook up recipes router
const recipesRouter = require('./controllers/recipes.js');
app.use('/recipes', recipesRouter);

// Hook up recipes_user router
const recipesDBRouter = require('./controllers/dbrecipes.js');
app.use('/users', recipesDBRouter);

// Hook up users router
const usersRouter = require('./controllers/users.js');
app.use('/users', usersRouter);

// note how authService.restrict is used as before
// as a middleware for restricted routes
app.get('/restricted', authService.restrict(), (req, res) => {
	res.json({ msg: 'yay' });
});

app.get('/isLoggedIn', authService.isLoggedIn, (req, res) => {
	res.json({ isLoggedIn: res.locals.isLoggedIn, tokenData: res.locals.tokenData });
});

// Set up error handling middleware
app.use((err, req, res, next) => {
	console.log('Error encountered:', err);
	res.status(500);
	res.send(err);
});
