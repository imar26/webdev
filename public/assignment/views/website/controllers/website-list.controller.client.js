(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.goToProfile = goToProfile;
        vm.newWebsite = newWebsite;
        vm.newPage = newPage;
        vm.editWebsite = editWebsite;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
        function newWebsite() {
            $location.url("/user/"+vm.userId+"/website/new/");
        }
        function newPage() {

        }
        function editWebsite() {

        }
    }
})();