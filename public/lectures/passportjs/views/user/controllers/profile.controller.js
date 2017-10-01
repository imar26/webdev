(function() {
	angular
		.module("PassportApp")
		.controller("ProfileController", ProfileController);

	function ProfileController(currentUser, UserService, $location) {
		var vm = this;

		vm.currentUser = currentUser.data;

		vm.logout = logout;

		function logout() {
			UserService
				.logout()
				.then(function() {
					$location.url('/login');
				});
		}		
	}
})();