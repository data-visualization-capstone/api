var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// var base_data = {
//   _id       : { type: String, default: utils.objectId, index: { unique: true } },
//   modified  : { type: Date, default: Date.now, set: setDate },
//   created   : { type: Date, default: Date.now, set: setDate, index: true }
// };

var LocationSchema   = new Schema({
	userId: String,
	date:   Number,
	latitude:  Number,
	longitude: Number,
	count: Number,
});

module.exports = mongoose.model('Location', LocationSchema);
