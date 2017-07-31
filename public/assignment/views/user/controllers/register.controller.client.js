(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(user) {
        	user = UserService.createUser(user);
        	if(user) {
        		$location.url("/user/"+user);
        	} else {
        		vm.alert = "Registration not successful.";
        	}
        }
    }
})();