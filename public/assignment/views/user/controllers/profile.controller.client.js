(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
		function init() {
			vm.user = UserService.findUserById(vm.userId);
            console.log(vm.user);
		}
		init();
    }
})();