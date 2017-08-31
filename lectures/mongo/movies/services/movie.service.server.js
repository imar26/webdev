

module.exports = function(app) {
	app.post('/api/movie', createMovie);
	// app.get('/api/movie', findAllMovies);
	// app.delete('/api/movie/:movieId', deleteMovie);

	// var MovieModel = require('../models/movie.model.server.js')();

	function createMovie(req, res) {
		console.log('req.body');
		// console.log(req.body);
		// MovieModel
		// 	.createMovie(req.body)
		// 	.then(function(movie) {
		// 		res.send(200);
		// 	}, function(err) {
		// 		res.sendStatus(500).send(err);
		// 	});
	}

	// function findAllMovies(req, res) {
	// 	MovieModel
	// 		.findAllMovies()
	// 		.then(function(movies) {
	// 			res.json(movies);
	// 		}, function(err) {
	// 			res.sendStatus(500).send(err);
	// 		});
	// }

	// function deleteMovie(req, res) {
	// 	var movieId = req.params.movieId;
	// 	MovieModel
	// 		.deleteMovie(movieId)
	// 		.then(function(movie) {
	// 			res.sendStatus(200).send(movie);
	// 		}, function(err) {
	// 			res.sendStatus(500).send(err);
	// 		});
	// }

};