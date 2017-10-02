(function() {
	angular
		.module("PassportApp")
		.controller("RegisterController", RegisterController);

	function RegisterController($location, UserService) {
		var vm = this;

		vm.registerUser = registerUser;

		function registerUser(user) {
			if(user.password === user.password2) {
				UserService
					.register(user)
					.then(function(user) {
						if(user) {
							$location.url('/profile');
						} else {
							vm.error = err.data;
						}
					}, function(err) {
						vm.error = err.data;
					});
			}
		}
	}
})();