(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    
    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            console.log(user);
            var u;
            UserService
                .login(user)
                .then(
                    function(response) {
                        u = response.data;
                        if(u) {
                            $location.url("/user/" + u._id);
                        } else {
                            vm.alert = "Unable to login";
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