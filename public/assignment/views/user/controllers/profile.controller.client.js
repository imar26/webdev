(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.goToProfile = goToProfile;
		function init() {
			vm.user = UserService.findUserById(vm.userId);
		}
		init();
        function updateUser(user) {
            user = UserService.updateUser(vm.userId, user);
            if(user) {
                vm.success = "Profile updated successfully.";
            }
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
    }
})();