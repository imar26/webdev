(function() {
	angular
		.module('MoviesApp')
		.factory('ActorService', ActorService);
	function ActorService($http) {
		var api = {
			createActor: createActor,
			findAllActors: findAllActors,
			deleteActor: deleteActor
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
	}
})();