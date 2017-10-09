(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    
    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var u;
            UserService
                .login(user)
                .then(
                    function(response) {
                        u = response.data;
                        if(u == 'User not found') {
                            vm.alert = "User not found";
                        } else if(u == 'Invalid Credentials') {
                            vm.alert = "Invalid Credentials";
                        } else if(u) {
                            $location.url("/user/" + u._id);
                        }
                    },
                    function(response) {
                        if(response.data == 'Not Found') {
                            vm.alert = "Unable to login";
                        }
                    }
                );
            
        }
    }
})();