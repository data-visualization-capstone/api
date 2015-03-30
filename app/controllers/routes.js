var _            = require('underscore');
var mongoose     = require('mongoose');
var locControl   = require('../controllers/location');
var tweetControl = require('../controllers/tweet');
var dbControl    = require('../controllers/database');

// New Twitter Connection


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

    // Route for /locations
    // ------------------------------------------------------------------------
    app.route('/locations')
        // create a location (accessed at POST http://localhost:8080/locations)
        .post(function(req, res) {
            locControl.post(req, res);
        })

        // get all the locations
        // GET http://localhost:8080/api/locations
        .get(function(req, res) {
            locControl.get(req, res);
        });

    // Route for /locations/:location_id
    // ------------------------------------------------------------------------
    app.route('/locations/:location_id')

        // get the location with that id
        .get(function(req, res) {
            locControl.getLocByID(req, res);
        })

        // update the location with this id
        .put(function(req, res) {
            locControl.put(req, res);
        })

    // Run a twitter search with the specified hash
    app.route('/twitter/search/:hash')
        .get(function(req, res) {
            tweetControl.getSearch(req, res);
        });

    // Begin a twitter stream to log tweets with the searched hash to the database.
    app.route('/twitter/stream/:hash')

        .get(function(req, res) {
            tweetControl.getStream(req, res);
        })

        .post(function(req, res) {
            tweetControl.createStream(req, res);
        });

    app.route('/database')

        .get(function(req, res){
            dbControl.get(req, res);
        })

        .post(function(req, res) {
            dbControl.post(req, res);
        });

}

// Check if incoming request is from valid URL
validClient = function(host){

    // Check domains that our API will respond to
    // http://www.w3.org/TR/cors/#access-control-allow-origin-response-hea
    return _.contains(DV.config.development.valid_client_domains, host);
}

// Set 'Access-Control-Allow-Origin' to header
// http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
setHeaders = function(res){

    // Get source of incoming request.
    var client = res.req.headers.origin;

    // console.log("Request from " + client + ". Checking supported CORS domains...")
    // Don't set CORS headers if client URL is declined
    if (!validClient(client)){

        // If invalid client, lets set
        // our allowed client to our website.
        client = "vent8225.dyndns.org";
    };

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', client);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    return res;
}
