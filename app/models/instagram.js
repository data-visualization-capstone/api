var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var InstagramSchema   = new Schema({
	// type:      String,
    // userId:    String,
	// date:      Number,
	// latitude:  Number,
	// longitude: Number,
	// count:     Number,
    // modified:  Number,
});

module.exports = mongoose.model('Instagram', InstagramSchema);
