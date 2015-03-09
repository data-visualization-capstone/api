var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    type:     String,
	name:     String,
    created:  Number,
    modified: Number,
});

module.exports = mongoose.model('User', UserSchema);