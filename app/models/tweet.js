var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TweetSchema   = new Schema({
    user:       String,
    message:    String,
    created_at: Number,  // By default, this is a human readable string, need to convert to unix time later
    latitude:   Number,
    longitude:  Number,
});

module.exports = mongoose.model('Tweet', TweetSchema);