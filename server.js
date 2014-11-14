// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// Project Params (Data Visualization)
// Prefix with our Acronym for the sake of sanity
DV = {};

// Store environment-dependent variables
DV.config = require('./config/config');


// connect to our database
var mongoose   = require('mongoose');
mongoose.connect(DV.config.development.connectURL); 

// Database Models
var User     = require('./app/models/user');
var Location = require('./app/models/location');


/*********************************
          ROUTES
 *********************************/

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


// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

	// create a user (accessed at POST http://localhost:8080/users)
	.post(function(req, res) {
		
		var user = new User();		// create a new instance of the User model
		user.name = req.body.name;  // set the users name (comes from the request)

		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created!' });
		});

		
	})

	// get all the users (accessed at GET http://localhost:8080/api/users)
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.send(err);

			res.json(users);
		});
	});

// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

	// get the user with that id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			res.json(user);
		});
	})

	// update the user with this id
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {

			if (err)
				res.send(err);

			user.name = req.body.name;
			user.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'User updated!' });
			});

		});
	})

	// delete the user with this id
	// .delete(function(req, res) {
	// 	User.remove({
	// 		_id: req.params.user_id
	// 	}, function(err, user) {
	// 		if (err)
	// 			res.send(err);

	// 		res.json({ message: 'Successfully deleted' });
	// 	});
	// });


// on routes that end in /locations
// ----------------------------------------------------
router.route('/locations')

	// create a location (accessed at POST http://localhost:8080/locations)
	.post(function(req, res) {
		
		var location = new Location();		// create a new instance of the Location model
		location.name = req.body.name;  // set the locations name (comes from the request)

		location.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Location created!' });
		});

		
	})

	// get all the locations (accessed at GET http://localhost:8080/api/locations)
	.get(function(req, res) {
		Location.find(function(err, locations) {
			if (err)
				res.send(err);

			res.json(locations);
		});
	});

// on routes that end in /locations/:location_id
// ----------------------------------------------------
router.route('/locations/:location_id')

	// get the location with that id
	.get(function(req, res) {
		Location.findById(req.params.location_id, function(err, location) {
			if (err)
				res.send(err);
			res.json(location);
		});
	})

	// update the location with this id
	.put(function(req, res) {
		Location.findById(req.params.location_id, function(err, location) {

			if (err)
				res.send(err);

			location.name = req.body.name;
			location.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Location updated!' });
			});

		});
	})

	// delete the location with this id
	// .delete(function(req, res) {
	// 	Location.remove({
	// 		_id: req.params.location_id
	// 	}, function(err, location) {
	// 		if (err)
	// 			res.send(err);

	// 		res.json({ message: 'Successfully deleted' });
	// 	});
	// });

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
