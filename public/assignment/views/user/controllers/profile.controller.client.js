(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location, $timeout, $window) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.goToProfile = goToProfile;
        vm.goToWebsites = goToWebsites;
		function init() {
			UserService
                .findUserById(vm.userId)
                .then(
                    function(response) {
                        vm.user = response.data;
                    }, function(response) {
                        console.log(response);
                    }
                );
		}
		init();
        function updateUser(user) {
            var user ;
            UserService
                .updateUser(vm.userId, user)
                .then(
                    function(user) {
                        if(user) {
                            vm.success = "Profile updated successfully.";
                            $timeout(function() {
                                $window.location.reload();
                            }, 2000);
                        } else {
                            vm.error = "Profile could not be updated.";
                            $timeout(function() {
                                $window.location.reload();
                            }, 2000);
                        }
                    }, function(response) {
                        console.log(response);
                    }
                );            
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
        function goToWebsites() {
            $location.url("/user/"+vm.userId+"/website/");
        }
    }
})();