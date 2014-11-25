var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	name:     String,
    created:  Number,
    modified: Number,
});

module.exports = mongoose.model('User', UserSchema);