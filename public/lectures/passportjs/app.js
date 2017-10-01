(function() {
	angular
		.module("PassportApp", ["ngRoute"])
		.config(configuration);

	function configuration($routeProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: 'views/user/templates/login.view.html',
				controller: 'LoginController',
				controllerAs: 'model'
			})
			.when('/profile', {
				templateUrl: 'views/user/templates/profile.view.html',
				controller: 'ProfileController',
				controllerAs: 'model',
				resolve: {
					checkLogin: checkLogin
				}
			})
			.otherwise({
				redirectTo: '/login'
			});
	}

	function checkLogin($q, UserService, $location) {
		var d = $q.defer();
		UserService
			.loggedin()
			.then(function(user) {
				if(user.data == '0') {
					d.reject();
					$location.url('/login');
				} else {
					d.resolve(user);			
				}
			}, function(err) {
				error = err.data;
			});
		return d.promise;
	}
})();