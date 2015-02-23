var _            = require('underscore');
var moment       = require('moment');
var mongoose     = require('mongoose');
var locControl   = require('../controllers/location');
var userControl  = require('../controllers/user');
var tweetControl = require('../controllers/tweet');
var dbControl    = require('../controllers/database');



exports.post = function(req, res){
	console.log('Database query received');

	var type = req.body.type;
	switch(type){
		case 'user' :
			userControl.get(req, res);
		case 'location' :
			locControl.get(req, res);
		case 'tweet' :
			tweetControl.get(req, res);
	}

}