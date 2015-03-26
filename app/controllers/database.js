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
	var response = {res: null};
	// Set headers correctly
    res = setHeaders(res);

	switch(type){
		// If location, do something
		case 'location' :
			console.log('Location database request');
			// Search the location db and find locations within
			console.log(query.date);
			response.res = Location.where('date').gt(query.date - 10).lt(query.date + 10);
			break;
		// If tweet, do something
		case 'tweet' :
			console.log('Tweet database request');
			// Search the tweet's message for the keyword from the query
			response.res = Tweet.where('message').regex(query.keyword);
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
		response.res.exec(function(err, obj) {
	        if (err) console.log(err);
	        res.json(obj);
	        console.log('Response sent.');
		});
	}
};

// Takes a query and builds a response to send to the database.
// The 'response' paramter is an empty object handed in from the parent function
// This function adds the built query to this object, and it is executed by the parent.
var queryLocation = function(query, response){
	// Extract the param from the query (One of: dateRange, radius)
	var queryParam = query.param;

	if(queryParam == 'dateRange'){
		// if dateRange, extract the range and perform 'where' query with it.
		response.res = Location.where('date').gt(query.low).lt(query.high);
	} else
	if(queryParam == 'radius'){
		// TODO: figure a way to produce a searchable lat/lon radius
	}
}

exports.get = function(req, res){
	console.log('GET request to database endpoint')
	res = setHeaders(res);
	res.json({ message: 'Welcome to the database endpoint!' });
}
