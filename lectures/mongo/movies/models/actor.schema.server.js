module.exports = function() {
	var mongoose = require('mongoose');

	var ActorSchema = mongoose.Schema({
		name: String,
		movies: [{type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'}]
	}, {collection: 'ActorDB'});

	return ActorSchema;
};