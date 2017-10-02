(function() {
	angular
		.module("PassportApp")
		.factory("UserService", UserService);

	function UserService($http) {
		var api = {
			login: login,
			loggedin: loggedin,
			logout: logout,
			register: register,
			isAdmin: isAdmin,
			passportFindAllUsers: passportFindAllUsers,
			deleteUser: deleteUser,
			unregister: unregister,
			updateUser: updateUser,
			updateProfile: updateProfile
		};
		return api;

		function register(user) {
			return $http.post('/api/passportregister', user);
		}

		function login(user) {
			return $http.post('/api/passportlogin', user);
		}

		function loggedin() {
			return $http.post('/api/passportloggedin');
		}

		function logout() {
			return $http.post('/api/passportlogout');
		}

		function isAdmin() {
			return $http.post('/api/isAdmin');
		}

		function passportFindAllUsers() {
			return $http.get('/api/passportFindAllUsers');
		}

		function deleteUser(userId) {
			return $http.delete('/api/deleteUser/'+userId);
		}

		function unregister(userId) {
			return $http.delete('/api/unregister/'+userId);
		}	

		function updateUser(user) {
			return $http.put('/api/updateUser', user);
		}

		function updateProfile(user) {
			return $http.put('/api/updateProfile', user);
		}
	} 
})();