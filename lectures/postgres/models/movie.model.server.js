var client = require('./client');
var q = require('q');

function findAllMovies() {
	var sql = "select * from webdev.movie;";
	client.query(sql, function(err, movies) {
		console.log(movies);
	});
}

function createMovie(movie) {
	var sql = "INSERT INTO webdev.movie(title) VALUES ('"+movie.title+"');";
	client.query(sql, function(err, movie) {
		console.log(movie);
	});
}

findAllMovies();

// createMovie({title: 'Will Smith'});