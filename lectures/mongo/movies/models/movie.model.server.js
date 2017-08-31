module.exports = function() {
	var mongoose = require('mongoose');

	var MovieSchema = require('./movie.schema.server.js')();

	var MovieModel = mongoose.model('MovieModel', MovieSchema);

	var q = require('q');

	var api = {
		createMovie: createMovie,
		findAllMovies: findAllMovies,
		deleteMovie: deleteMovie
	};
	return api;

	function createMovie(movie) {
		var d = q.defer();
		MovieModel
			.create(movie, function(err, movie) {
				if(err) {
					d.abort(err);
				} else {
					d.resolve(movie);
				}
			});
			return d.promise;
	}

	function findAllMovies() {
		var d = q.defer();
		MovieModel
			.find(function(err, movies) {
				if(err) {
					d.abort(err);
				} else {
					d.resolve(movies);
				}
			});
			return d.promise;
	}

	function deleteMovie(id) {
		var d = q.defer();
		MovieModel
			.remove({_id: id}, function(err, movie) {
				if(err) {
					d.abort(err);
				} else {
					d.resolve(movie);
				}
			});
			return d.promise;
	}
};