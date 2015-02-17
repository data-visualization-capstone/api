var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TweetSchema   = new Schema({
    user:       String,
    message:    String,
    created_at: Number,
    latitude:   Number,
    longitude:  Number,
});

module.exports = mongoose.model('Tweet', TweetSchema);