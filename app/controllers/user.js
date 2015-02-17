var _       = require('underscore')
var moment  = require('moment');

// Check if all provided keys exist
verifyKeysExist = function (object, next) {
    // Extract the actual user data from the JSON object
    var userData = object._doc;
    // Hand off the user data to check for missing keys
    var missing = missingKeys(userData);
    if (missing.length > 0) {
        return next(new Error('Missing keys -- ' + missing));
    }
    else {
        next(null, object);
    }
};

// Takes an object, and an array of keys (strings)
missingKeys = function(data) {
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

// Logic for a post request to the /users route.
exports.post = function(req, res) {          
    var user = new User();      // create a new instance of the User model
    
    user.name = req.body.name;  // set the users name (comes from the request)
    user.created = moment().unix();
    user.modified = moment().unix();
    console.log(user);

    res = setHeaders(res);

    verifyKeysExist(user, function(err, obj){
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
}

// Logic for a get request to the /users route.
exports.get = function(req, res) {
    console.log('User list requested.');
    User.find(function(err, users) {
        if (err) res.send(err);
        res = setHeaders(res);
        res.json(users);
    });
}

exports.getUserByID = function(req, res) {
    console.log('User requested by ID.');
    // Find user by using the ID in the req.
    User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);
        res = setHeaders(res);
        res.json(user);
    });
}

exports.put = function(req, res){
    User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);

        user.name = req.body.name;
        user.save(function(err) {
            if (err) res.send(err);

            res = setHeaders(res);

            res.json({ message: 'User updated!', user : user });
        });
    });
}
