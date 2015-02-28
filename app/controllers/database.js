var _            = require('underscore');
var moment       = require('moment');
var mongoose     = require('mongoose');

// Main database query function
exports.post = function(req, res){
	console.log('Database query received');

	// Extract the type of request from the body
	var type = req.body.type;
	console.log(req.body);

	switch(type){
		// If user, do something
		case 'user' :
			console.log('User database request');
			break;
		// If location, do something
		case 'location' :
			console.log('Location database request');
			break;
		// If tweet, do something
		case 'tweet' :
			console.log('Tweet database request');
			break;
		// If type not defined, error
		default :
			console.log('Error, type was: ' + type);
			break;
	}
	
	// Set headers and send back the requested type
	res = setHeaders(res);
	res.json({ message: 'Request received, type was ' + type , type: type});

}