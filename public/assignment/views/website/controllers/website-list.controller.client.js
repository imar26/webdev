(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.websites = vm.websites.name;
        }
        init();
    }
})();