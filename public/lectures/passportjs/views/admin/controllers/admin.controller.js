(function() {
	angular
		.module("PassportApp")
		.controller("AdminController", AdminController);

	function AdminController(UserService) {
		var vm = this;

		vm.deleteUser = deleteUser;
		vm.updateUser = updateUser;

		function init() {
			UserService
				.passportFindAllUsers()
				.then(function(users) {
					console.log(users);
					vm.users = users.data;
					console.log(vm.users);
					console.log(vm.users);
				}, function(err) {
					console.log(err);
				});
		}
		init();

		function deleteUser(userId) {
			UserService
				.deleteUser(userId)
				.then(function(status) {
					console.log(status);
					if(status) {
						init();
					}
				}, function(err) {
					console.log(err);
				});
		}

		function updateUser(user) {
			UserService
				.updateUser(user)
				.then(function(user) {
					console.log(user);
					if(user) {
						init();
					}
				}, function(err) {
					console.log(err);
				});
		}
	}
})();