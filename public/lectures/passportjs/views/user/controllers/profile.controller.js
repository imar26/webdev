(function() {
	angular
		.module("PassportApp")
		.controller("ProfileController", ProfileController);

	function ProfileController($http) {
		var vm = this;

		vm.loginUser = loginUser;

		function loginUser(user) {
			$http.post('/api/passportlogin', user)
				.then(function(response) {
					user = response.data;
					if(user) {						
						vm.success = 'Welcome';
					} else {
						vm.error = 'Unauthorized';
					}
				}, function(error) {
					vm.error = error.data;
				});
		}
	}
})();