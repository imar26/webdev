(function() {
	angular
		.module('MoviesApp')
		.factory('MovieService', MovieService);
	function MovieService($http) {
		var api = {
			createMovie: createMovie,
			findAllMovies: findAllMovies,
			deleteMovie: deleteMovie
		};
		return api;

		function createMovie(movie) {
			return $http.post('/api/movie');
		}

		function findAllMovies() {
			return $http.get('/api/movie');
		}

		function deleteMovie(id) {
			return $http.delete('/api/movie/'+id);
		}
	}
})();