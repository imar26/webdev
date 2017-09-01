module.exports = function() {
	var mongoose = require('mongoose');

	var MovieSchema = mongoose.Schema({
		name: String
	}, {collection: 'MoviesDB'});

	return MovieSchema;
};