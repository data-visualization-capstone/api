var _            = require('underscore');
var moment       = require('moment');
var mongoose     = require('mongoose');

exports.get = function(req, res){
	console.log('GET request to database endpoint')
	res = setHeaders(res);
	res.json({ message: 'Welcome to the database endpoint!' });
}

// Main database query function
exports.post = function(req, res){
	console.log('Database query received');

	// Extract the type of request from the body
	var query = req.body
	var type  = query.type;

	// Initialize an empty response to fill below.
	// Note: this is basically a JSON object used as a pointer, so the helper functions below
	// can fill in the correct query to be executed by Mongoose within this function.
	var response = {res: null};

	// Set headers correctly
    res = setHeaders(res);

	switch(type){
		case 'location' :
			console.log('Location database request');
			// Hand the query and response object off to the Location query handler.
			// The handler will modify the res inside the response, and then exec will execute it below.
			queryLocation(query, response);
			break;
		case 'tweet' :
			console.log('Tweet database request');
			// Hand the query and response object off to the Tweet query handler.
			// The handler will modify the res inside the response, and then exec will execute it below.
			queryTweet(query, response);
			break;
		// If type not defined, error
		default :
			console.log('Error, type was: ' + type);
			break;
	}


	// Set headers and send back the requested type
	// res = setHeaders(res);
	if(response.res == null) {
		res.json({ message: "Request contains error, type was '" + type +
							"' and query param was '" + query.param + "'",
				   type: type ,
				   param: query.param});
	}else{
		//Execute the above mongoose query on the database
		response.res.exec(function(err, obj) {
	        if (err) console.log(err);
	        res.json(obj);
	        console.log('Response sent.');
		});
	}
};


// Helper functions for running db queries:

// Takes a query and builds a response to send to the database.
// The 'response' paramter is an empty object handed in from the parent function
// This function adds the built query to this object, and it is executed by the parent.
var queryLocation = function(query, response){
	// Extract the param from the query (One of: all, daterange, radius)
	var queryParam = query.param;

	switch(queryParam) {
		case 'all' :
			// WARNING: this will probably crash Postman, use with caution.
			response.res = Location.find();
			break;
		case 'daterange' :
			// if dateRange, extract the range and perform 'where' query with it.
			var lo = parseInt(query.low);  // JSON parameters are not always ints, ensure that they are.
			var hi = parseInt(query.high);
			response.res = Location.where('date').gt(lo).lt(hi);
			console.log(response);
			break;
		default :
			// Search param was not specified or error occured.
			console.log('Error, param was: ' + queryParam);
	}
};

// Takes a query and builds a response to send to the database.
// The 'response' paramter is an empty object handed in from the parent function
// This function adds the built query to this object, and it is executed by the parent.
var queryTweet = function(query, response) {
	// Extract the param from the query (One of: all, daterange, keyword, user)
	var queryParam = query.param

	switch(queryParam) {
		case 'all' :
			// WARNING: this will probably crash Postman, use with caution.
			response.res = Tweet.find();
			break;
		case 'daterange' :
			// if dateRange, extract the range and perform 'where' query with it.
			var lo = parseInt(query.low);  // JSON parameters are not always ints, ensure that they are.
			var hi = parseInt(query.high);
			response.res = Tweet.where('created_at').gt(lo).lt(hi);
			break;
		case 'keyword' :
			// Search for the keyword in the tweets
			response.res = Tweet.where('message').regex(query.keyword);
			break;
		case 'user' :
			// Search the Tweet db for the given username.
			response.res = Tweet.where('user').regex(query.username)
			break;
		default :
			// Search param was not specified or an error occured.
			console.log('Error, param was: ' + queryParam);
	}
};
