(function() {
	angular
		.module("PassportApp", [])
		.controller("LoginController", LoginController);

	function LoginController($http) {
		var vm = this;

		vm.loginUser = loginUser;

		function loginUser(user) {
			$http.post('/api/passportlogin', user)
				.then(function(response) {
					console.log(response);
				}, function(error) {
					console.log(error);
				});
		}
	}
})();