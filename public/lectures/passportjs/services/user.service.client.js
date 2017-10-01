(function() {
	angular
		.module("PassportApp")
		.factory("UserService", UserService);

	function UserService($http) {
		var api = {
			login: login,
			loggedin: loggedin
		};
		return api;

		function login(user) {
			return $http.post('/api/passportlogin', user);
		}

		function loggedin() {
			return $http.post('/api/loggedin');
		}
	} 
})();