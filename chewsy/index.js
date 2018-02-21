// Import dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8080;

// Configure app
const app = express();

// Setup cors to allow front end
app.use(cors());

// Body Parser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up morgan
app.use(morgan('dev'));

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

// Set up error handling middleware
app.use((err, req, res, next) => {
	console.log('Error encountered:', err);
	res.status(500);
	res.send(err);
});
