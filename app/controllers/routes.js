var _           = require('underscore');
var locControl  = require('../controllers/location');
var userControl = require('../controllers/user');
var moment      = require('moment');
var Twitter     = require('twitter');

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
            
            var user = new User();      // create a new instance of the User model
            user.name = req.body.name;  // set the users name (comes from the request)
            user.created = moment().unix();
            user.modified = moment().unix();
            console.log(user);

            res = setHeaders(res);

            userControl.verifyKeysExist(user, function(err, obj){
                // Check for an error indicating keys are missing
                if (err) {
                    // Send the missing data error
                    console.log(err);
                    // TODO: this is not sending the error text, not sure why, the rest seems to be working
                    res.send(500, err.toString());
                }
                else {
                    // Else the data is fine, save it to the database
                    user.save(function(err) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            console.log("\nUser created!")
                            res.json({ message: 'User created!' , user: user});
                        }
                    });
                }
            })
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

                    res.json({ message: 'User updated!', user : user });
                });
            });
        })

        // delete the user with this id
        // .delete(function(req, res) {
        //  User.remove({
        //      _id: req.params.user_id
        //  }, function(err, user) {
        //      if (err)
        //          res.send(err);
        //      res.json({ message: 'Successfully deleted' });
        //  });
        // });


    // Route for /locations
    // ------------------------------------------------------------------------
    app.route('/locations')
        // create a location (accessed at POST http://localhost:8080/locations)
        .post(function(req, res) {

            var location = new Location();  // create a new instance of the Location model

            location.userId = req.body.userId;
            location.latitude = req.body.latitude;
            location.longitude = req.body.longitude;
            location.date = req.body.date;
            location.created = moment().unix();
            location.modified = moment().unix();

            console.log("\n POST to /locations:");
            console.log(location);
            
            res = setHeaders(res);

            locControl.verifyKeysExist(location, function(err, obj){        
                // Check for an error indicating keys are missing
                if (err) {
                    // Send the missing data error
                    console.log(err);
                    // TODO: this is not sending the error text, not sure why, the rest seems to be working
                    res.send(500, err.toString());
                }
                else {
                    // Else the data is fine, save it to the database
                    location.save(function(err) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            console.log("\nLocation created!")
                            res.json({ message: 'Location created!' , location: location});
                        }
                    });
                }
            })
        })

        // get all the locations 
        // GET http://localhost:8080/api/locations
        .get(function(req, res) {
            console.log('\nLocations list requested.');
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
            console.log('\nLocation requested by ID.');
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
                    res.json({ message: 'Location updated!', location : location});
                });
            });
        })

        // delete the location with this id
        // .delete(function(req, res) {
        //  Location.remove({
        //      _id: req.params.location_id
        //  }, function(err, location) {
        //      if (err)
        //          res.send(err);

        //      res.json({ message: 'Successfully deleted' });
        //  });
        // });

    app.route('/twitter/:hash')
        .get(function(req, res) {
            console.log('/twitter hit');

            // New Twitter Connection
            var twitter = new Twitter(DV.config.development.twitter);

            var params = {
                q: "#" + req.params.hash,
                geocode: "42.350000,-71.060000,2mi",
                count: 50,
            };

            twitter.get('search/tweets', params, function(error, tweets, response){
              if (!error) {
                // console.log(tweets.statuses)

                var acc = [];

                for (var i in tweets.statuses){
                    val = tweets.statuses[i];

                    acc.push({
                        userId : val.id,
                        date : val.created_at,
                        message   : val.text,
                        latitude  : val.coordinates.coordinates[0],
                        longitude : val.coordinates.coordinates[1],
                    })
                }

                res = setHeaders(res);
                res.json(acc);
                // res.json(tweets.statuses[0].coordinates)

              }
            });



        });

}

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
}
