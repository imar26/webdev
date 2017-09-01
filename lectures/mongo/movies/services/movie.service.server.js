module.exports = function(app, model) {
	app.post('/api/movie/create', createMovie);
	app.get('/api/movie/findAll', findAllMovies);
	app.delete('/api/movie/delete/:movieId', deleteMovie);

	var MovieModel = model.MovieModel;

	function createMovie(req, res) {
		MovieModel
			.createMovie(req.body)
			.then(function(movie) {
				res.send(200);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function findAllMovies(req, res) {
		MovieModel
			.findAllMovies()
			.then(function(movies) {
				res.json(movies);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function deleteMovie(req, res) {
		var movieId = req.params.movieId;
		MovieModel
			.deleteMovie(movieId)
			.then(function(movie) {
				res.sendStatus(200).send(movie);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

};