(function() {
	angular
		.module('MoviesApp')
		.controller('ActorController', ActorController);
	function ActorController(ActorService, $timeout, $window, MovieService) {
		var vm = this;

		vm.createActor = createActor;
		vm.deleteActor = deleteActor;
		vm.addSelectedMovieToSelectedActor = addSelectedMovieToSelectedActor;

		function init() {
			ActorService
				.findAllActors()
				.then(function(actors) {
					vm.actors = actors.data;
				}, function(err) {
					vm.error = 'No Actors';
				});

			MovieService
				.findAllMovies()
				.then(function(movies) {
					vm.movies = movies.data;
				}, function(err) {
					vm.error = 'No Movies';
				});
		}
		init();

		function createActor(actor) {
			ActorService
				.createActor(actor)
				.then(function(actor) {
					vm.success = "Actor Added Successfully.";
					$timeout(function() {
						$window.location.reload();
					}, 1500);
				}, function(err) {
					console.log(err);
				});
		}

		function deleteActor(id) {
			ActorService
				.deleteActor(id)
				.then(function(actor) {
					vm.delete = "Actor Deleted Successfully.";
					$timeout(function() {
						$window.location.reload();
					}, 1500);
				}, function(err) {
					console.log(err);
				});
		}

		function addSelectedMovieToSelectedActor(movieId, actorId) {
			ActorService
				.addMovieToActor(movieId, actorId)
				.then(function(actor) {
					if(actor) {
						vm.addsuccess = "Movie Added to Actor Successfully.";
						$timeout(function() {
							$window.location.reload();
						}, 1500);
					}
				}, function(err) {
					console.log(err);
				});
		}
	}
})();