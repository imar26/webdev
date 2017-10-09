(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(user) {
        	UserService
                .findUserByUsername(user.username)
                .then(
                    function(response) {
                        if(response.data) {
                            vm.error = "Username already exists.";                      
                        } else {
                            UserService
                                .register(user)
                                .then(
                                    function(response) {
                                        var user = response.data;
                                        $rootScope.currentUser = user;
                                        if(user) {
                                            $location.url("/user/"+user._id);
                                        } else {
                                            vm.alert = "Registration not successful.";
                                        }
                                    }, function(error) {
                                        vm.passwordsDoNotMatch = "Passwords do not match";
                                    }
                                ); 
                        }
                    }, function(error) {
                        console.log(error);
                    }
                );
        }
    }
})();