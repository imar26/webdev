module.exports = function() {
	var mongoose = require('mongoose');

	var ActorSchema = mongoose.Schema({
		name: String
	}, {collection: 'ActorDB'});

	return ActorSchema;
};