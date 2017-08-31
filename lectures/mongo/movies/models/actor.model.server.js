module.exports = function() {
	var mongoose = require('mongoose');

	var ActorSchema = require('./actor.schema.server.js')();

	var ActorModel = mongoose.model('ActorModel', ActorSchema);

	var q = require('q');

	var api = {
		createActor: createActor,
		findAllActors: findAllActors,
		deleteActor: deleteActor
	};
	return api;

	function createActor(actor) {
		var d = q.defer();
		ActorModel
			.create(actor, function(err, actor) {
				if(err) {
					d.abort(err);
				} else {
					d.resolve(actor);
				}
			});
			return d.promise;
	}

	function findAllActors() {
		var d = q.defer();
		ActorModel
			.find(function(err, actors) {
				if(err) {
					d.abort(err);
				} else {
					d.resolve(actors);
				}
			});
			return d.promise;
	}

	function deleteActor(id) {
		var d = q.defer();
		ActorModel
			.remove({_id: id}, function(err, actor) {
				if(err) {
					d.abort(err);
				} else {
					d.resolve(actor);
				}
			});
			return d.promise;
	}
};