var _       = require('underscore')
var moment  = require('moment');

// Check if all provided keys exist
// (Object to check), (array of strings (keys object has)), (next is call back)
var verifyKeysExist = function (object, next) {
    // Extract the actual location data from the JSON object
    // TODO: could also add a hand off of the User data to the same function
    var locData = object._doc;
    // Hand off the location data to check for missing keys
    var missing = missingKeys(locData);
    if (missing.length > 0) {
        return next(new Error('Missing keys -- ' + missing));
    }
    else {
        next(null, object);
    }
};

// Takes an object, and an array of keys (strings)
var missingKeys = function(data) {
    // Array to hold the missing keys
    var missingKeys = [];
    // For each key value pair, check if any values are equal to null or ''.
    _.each(data, function(value, key) {
        if(value == null || value == '') {
            // add the missing key to the array
            missingKeys.push(key);
        }
    })
    return missingKeys;
};

exports.post = function(req, res) {
    var location = new Location();  // create a new instance of the Location model

    location.type       = 'location'
    location.userId     = req.body.userId;
    location.latitude   = req.body.latitude;
    location.longitude  = req.body.longitude;
    location.date       = req.body.date;
    location.created    = moment().unix();
    location.modified   = moment().unix();

    console.log("\n POST to /locations:");
    console.log(location);

    res = setHeaders(res);

    verifyKeysExist(location, function(err, obj){
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
};

exports.get = function(req, res) {
    console.log('\nLocations list requested.');
    Location.find(function(err, locations) {
        if (err) res.send(err);
        res = setHeaders(res);
        res.json(locations);
        console.log('Locations sent.');
    });
};

exports.getLocByID = function(req, res) {
    console.log('\nLocation requested by ID.');
    Location.findById(req.params.location_id, function(err, location) {
        if (err)
            res.send(err);
        res.json(location);
    });
};

exports.put = function(req, res) {
    Location.findById(req.params.location_id, function(err, location) {
        if (err) res.send(err);
        location.name = req.body.name;
        location.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'Location updated!', location : location});
        });
    });
};
