(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
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
            user = UserService.updateUser(vm.userId, user);
            if(user) {
                vm.success = "Profile updated successfully.";
            } else {
                vm.error = "Profile could not be updated.";
            }
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
        function goToWebsites() {
            $location.url("/user/"+vm.userId+"/website/");
        }
    }
})();