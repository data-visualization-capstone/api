// BASE SETUP
// =============================================================================

// Call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');

// Launch express
// TODO: made global for routes.js to see. Potentially refactor, or
//		 move to dedicated global data file.
app = express();

// Configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// Project Params (Data Visualization)
// Prefix with our Acronym for the sake of sanity
DV = {};

// Store environment-dependent variables
DV.config = require('./config/config');


// Connect to our database
var mongoose   = require('mongoose');
mongoose.connect(DV.config.development.connectURL); 


// Database Models
// TODO: these were made global to allow the routes file to see them,
//		 either figure out if this is ok, or move these variables into
//		 a dedicated global data file.
User     = require('./app/models/user');
Location = require('./app/models/location');

// Pull the routes from app/controllers/routes.js
require('./app/controllers/routes')(app);

//////////////////////////////////////////////////////////
// Old code commented out 11/14/14
// TODO: remove if not necessary
/*
// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

// GET localhost:8080/api
// test route to make sure everything is working

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});
*/
//////////////////////////////////////////////////////////


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
