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
                .findUserByCredentials(user.username, user.password)
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
                        console.log(response.data)
                    }
                );
            
        }
    }
})();