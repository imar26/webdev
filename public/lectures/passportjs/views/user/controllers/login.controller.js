(function() {
	angular
		.module("PassportApp")
		.controller("LoginController", LoginController);

	function LoginController($http, $location, UserService) {
		var vm = this;

		vm.loginUser = loginUser;

		function loginUser(user) {
			UserService
				.login(user)
				.then(function(user) {
					if(user) {
						$location.url('/profile');
					}
				}, function(err) {
					vm.error = err.data;
				});
		}
	}
})();