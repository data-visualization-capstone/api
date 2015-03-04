var _            = require('underscore');
var moment       = require('moment');
var mongoose     = require('mongoose');

// Main database query function
exports.post = function(req, res){
	console.log('Database query received');

	// Extract the type of request from the body
	var query = req.body
	var type  = query.type;
	// Initialize an empty response to fill below.
	var response = {};
	// Set headers correctly
    res = setHeaders(res);

	switch(type){
		// If user, do something 
		case 'user' :
			console.log('User database request');
			break;
		// If location, do something
		case 'location' :
			console.log('Location database request');
			// Search the location db and find locations within
			console.log(query.date);
			response = Location.where('date').gt(query.date - 86400).lt(query.date + 86400);
			break;
		// If tweet, do something
		case 'tweet' :
			console.log('Tweet database request');
			// Search the tweet's message for the keyword from the query
			response = Tweet.where('message').regex(query.keyword);
			break;
		// If type not defined, error
		default :
			console.log('Error, type was: ' + type);
			break;
	}


	// Set headers and send back the requested type
	// res = setHeaders(res);
	if(response == {}) {
		res.json({ message: 'Request received, type was ' + type , type: type});
	}else{
		//Execute the above mongoose query on the database
		response.exec(function(err, obj) {
	        if (err) console.log(err);
	        res.json(obj);
	        console.log('Response sent.');
		});
	}
};

exports.get = function(req, res){
	console.log('GET request to database endpoint')
	res = setHeaders(res);
	res.json({ message: 'Welcome to the database endpoint!' });
}