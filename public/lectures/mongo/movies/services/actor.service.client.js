(function() {
	angular
		.module('MoviesApp')
		.factory('ActorService', ActorService);
	function ActorService($http) {
		var api = {
			createActor: createActor,
			findAllActors: findAllActors,
			deleteActor: deleteActor,
			addMovieToActor: addMovieToActor,
			deleteMovieFromActor: deleteMovieFromActor
		};
		return api;

		function createActor(actor) {
			return $http.post('/api/actor', actor);
		}

		function findAllActors() {
			return $http.get('/api/actor');
		}

		function deleteActor(id) {
			return $http.delete('/api/actor/'+id);
		}

		function addMovieToActor(movieId, actorId) {
			return $http.put('/api/actor/'+actorId+'/movie/'+movieId);
		}

		function deleteMovieFromActor(actorId, movieId) {
			return $http.delete('/api/actor/'+actorId+'/movie/'+movieId);	
		}
	}
})();