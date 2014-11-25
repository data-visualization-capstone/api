var _  = require('underscore')


// Check if all provided keys exist
exports.verifyKeysExist = function (object, next) {
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