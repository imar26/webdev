(function() {
	angular
		.module('MoviesApp')
		.controller('ActorController', ActorController);
	function ActorController(ActorService, $timeout, $window) {
		var vm = this;

		vm.createActor = createActor;
		vm.deleteActor = deleteActor;

		function init() {
			ActorService
				.findAllActors()
				.then(function(actors) {
					vm.actors = actors.data;
				}, function(err) {
					vm.error = 'No Actors';
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
	}
})();