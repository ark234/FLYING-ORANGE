// Import dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mustache = require('mustache-express');
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

// Redirect default route
app.get('/', (req, res) => {
	res.redirect('/recipes');
});

// Set up error handling middleware
app.use((err, req, res, next) => {
	console.log('Error encountered:', err);
	res.status(500);
	res.send(err);
});
