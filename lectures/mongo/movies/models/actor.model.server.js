module.exports = function() {
	var mongoose = require('mongoose');

	var ActorSchema = require('./actor.schema.server.js')();

	var ActorModel = mongoose.model('ActorModel', ActorSchema);

	var q = require('q');

	var api = {
		createActor: createActor,
		findAllActors: findAllActors,
		deleteActor: deleteActor,
		addMovieToActor: addMovieToActor,
		deleteMovieFromActor: deleteMovieFromActor
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
			.find()
			.populate('movies', 'name -_id')
			.exec(function(err, actors) {
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

	function addMovieToActor(movieId, actorId) {
		var d = q.defer();
		ActorModel
			.findById(actorId, function(err, actor) {
				actor.movies.push(movieId);
				actor.save();
				d.resolve(actor);
			});
			return d.promise;	
	}

	function deleteMovieFromActor(actorId, movieId) {
		var d = q.defer();
		ActorModel
			.findById(actorId, function(err, actor) {
				var index = actor.movies.indexOf(movieId);
				actor.movies.splice(index, 1);
				actor.save();
				d.resolve(actor);
			});
			return d.promise;	
	}
};