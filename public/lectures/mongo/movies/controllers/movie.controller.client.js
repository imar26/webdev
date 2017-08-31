(function() {
	angular
		.module('MoviesApp')
		.controller('MovieController', MovieController);
	function MovieController(MovieService, $timeout, $window) {
		var vm = this;

		vm.createMovie = createMovie;
		vm.deleteMovie = deleteMovie;

		function init() {
			MovieService
				.findAllMovies()
				.then(function(movies) {
					vm.movies = movies.data;
				}, function(err) {
					vm.error = 'No Movies';
				});
		}
		init();

		function createMovie(movie) {
			MovieService
				.createMovie(movie)
				.then(function(movie) {
					vm.success = "Movie Added Successfully.";
					$timeout(function() {
						$window.location.reload();
					}, 1500);
				}, function(err) {
					console.log(err);
				});
		}

		function deleteMovie(id) {
			MovieService
				.deleteMovie(id)
				.then(function(movie) {
					vm.delete = "Movie Deleted Successfully.";
					$timeout(function() {
						$window.location.reload();
					}, 1500);
				}, function(err) {
					console.log(err);
				});
		}
	}
})();