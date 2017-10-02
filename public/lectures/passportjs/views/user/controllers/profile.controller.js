(function() {
	angular
		.module("PassportApp")
		.controller("ProfileController", ProfileController);

	function ProfileController(currentUser, UserService, $location, $timeout, $window) {
		var vm = this;

		vm.currentUser = currentUser.data;

		vm.logout = logout;
		vm.unregister = unregister;
		vm.updateProfile = updateProfile;

		function unregister(userId) {
			UserService
				.unregister(userId)
				.then(function() {
					$location.url('/login');
				});
		}

		function updateProfile(fname) {
			UserService
				.updateProfile(fname)
				.then(function(user) {
					if(user) {
						$timeout(function() {
							$window.location.reload();
						}, 1000);
					}
				});
		}

		function logout() {
			UserService
				.logout()
				.then(function() {
					$location.url('/login');
				});
		}		
	}
})();