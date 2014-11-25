var _  = require('underscore')


// Check if all provided keys exist
// (Object to check), (array of strings (keys object has)), (next is call back)
exports.verifyKeysExist = function (object, next) {
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
    console.log(missingKeys);
    return missingKeys;
};

// TYPE CHECKING STUB:
// Ignore for now.
/*
    _.each(data, function(value, key) {
        switch(key) {
            case 'userId':
                if(badInput(value, 'string')) missingKeys.push(key);
        }
    })
    // Little helper to make sure the value is the right
    // type and is not null
    var badInput = function(value, type) {
        return ((typeof value != type) || (value == null))
    }
*/