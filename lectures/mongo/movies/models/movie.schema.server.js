module.exports = function() {
	var mongoose = require('mongoose');

	var MovieSchema = mongoose.Schema({
		name: String,
		actors: [{type: mongoose.Schema.Types.ObjectId, ref: 'ActorModel'}]
	}, {collection: 'MoviesDB'});

	return MovieSchema;
};