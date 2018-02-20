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
const mustache = require('mustache-express');
const dotenv = require('dotenv').config();
const cors = require('cors');

/////////////////////////////////////////////////
// Added this as a reminder: we are not using it:
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
/////////////////////////////////////////////////
// Passport stuff would have been called from
// this index.js file...
// const auth = require('./services/auth.js');
/////////////////////////////////////////////////

const PORT = process.env.PORT || 8080;

console.log('process.env.LAI_API_KEY: ', process.env.LAI_API_KEY);
console.log('process.env.LAI_API_ID: ', process.env.LAI_API_ID);
console.log('process.env.PORT: ', process.env.PORT);

// Configure app
const app = express();

// Setup cors to allow front end
app.use(cors());

// Set up morgan
app.use(morgan('dev'));

// Register the engine template
app.engine('html', mustache());
// Set default .html file extension for the views
app.set('view engine', 'html');
// Set up directory for mustache template files
app.set('views', __dirname + '/views');
// Set up directory for static resources
app.use(express.static(__dirname + '/public'));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start server
app.listen(PORT, () => {
	console.log('Server started on port', PORT);
});

// Hook up recipes router
const recipesRouter = require('./controllers/recipes.js');
app.use('/recipes', recipesRouter);

// Hook up users router
const usersRouter = require('./controllers/users.js');
app.use('/users', usersRouter);

/////////////////////////////////////////////////
// Perhaps: => (?)...
// Redirect from the current index.js to:
// "/users/profile" is not relative, but 
// hard-coded...
// app.get('/', (req, res, next) => {
//   res.redirect('/users/profile');
// })
/////////////////////////////////////////////////

// Set up error handling middleware
app.use((err, req, res, next) => {
	console.log('Error encountered:', err);
	res.status(500);
	res.send(err);
});
