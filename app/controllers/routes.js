var _          = require('underscore');

// Make this module available to the server.js file
module.exports = function(app) {

	// Route for the root
	// ------------------------------------------------------------------------
	app.route('/')
		// Return welcome message for all requests to '/'
		.all(function(req, res, next) {
			console.log('Root accessed, sending welcome.');
			res.json({ message: 'hooray! welcome to our api!' });
		})

	// Route for /users
	// ------------------------------------------------------------------------
	app.route('/users')
		// create a user (accessed at POST http://localhost:8080/users)
		.post(function(req, res) {
			
			var user = new User();		// create a new instance of the User model
			user.name = req.body.name;  // set the users name (comes from the request)

			user.save(function(err) {
				if (err) res.send(err);

				res = setHeaders(res);

				res.json({ message: 'User created!' });
			});
		})

		// get all the users (accessed at GET http://localhost:8080/api/users)
		.get(function(req, res) {
			console.log('User list requested.');
			User.find(function(err, users) {
				if (err) res.send(err);

				res = setHeaders(res);
				
				res.json(users);
			});
		});

	// Route for /users/:user_id
	// ------------------------------------------------------------------------
	app.route('/users/:user_id')
		// get the user with that id
		.get(function(req, res) {
			console.log('User requested by ID.');
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);

				res = setHeaders(res);

				res.json(user);
			});
		})

		// update the user with this id
		.put(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);

				user.name = req.body.name;
				user.save(function(err) {
					if (err) res.send(err);

					res = setHeaders(res);

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


	// Route for /locations
	// ------------------------------------------------------------------------
	app.route('/locations')
		// create a location (accessed at POST http://localhost:8080/locations)
		.post(function(req, res) {

			var location = new Location();	// create a new instance of the Location model

			// Set params
			// TODO: Abstract key checking

			console.log("POST to /locations. Body:");
			console.log(req.body);

			location.name = req.body.name;
			location.latitude = req.body.latitude;
			location.longitude = req.body.longitude;
			location.count = req.body.count;
			location.date = req.body.date;

			var keys = ['name', 'latitude', 'longitude', 'count', 'date'];

			verifyKeysExist(location, keys, function(err, obj){
				if (err) return err;

				location.save(function(err) {
					if (err) res.send(err);

					res = setHeaders(res);

					res.json({ message: 'Location created!' });
				});
			})
		})

		// get all the locations 
		// GET http://localhost:8080/api/locations
		.get(function(req, res) {
			console.log('Locations list requested.');
			Location.find(function(err, locations) {
				if (err) res.send(err);

				res = setHeaders(res);

				res.json(locations);
			});
		});

	// Route for /locations/:location_id
	// ------------------------------------------------------------------------
	app.route('/locations/:location_id')

		// get the location with that id
		.get(function(req, res) {
			console.log('Location requested by ID.');
			Location.findById(req.params.location_id, function(err, location) {
				if (err)
					res.send(err);
				res.json(location);
			});
		})

		// update the location with this id
		.put(function(req, res) {
			Location.findById(req.params.location_id, function(err, location) {
				if (err) res.send(err);
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

},

// Set 'Access-Control-Allow-Origin' to header
// TODO: Apply header change to ALL requests
// http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
setHeaders = function(res){

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	return res;
},

// Check if all provided keys exist
verifyKeysExist = function (object, keys, next) {
  var missing = missingKeys(object, keys);

  if (missing.length > 0) return next(new Errors.BadRequestError('Missing keys', missing));

  next(null, object);
};

// Takes an object, and an array of keys (strings)
missingKeys = function(obj, array) {
  var missingKeys = []
  
  _.each(array, function(key) {
    if (!(key in obj)) missingKeys.push(key);
  })

  return missingKeys;
};