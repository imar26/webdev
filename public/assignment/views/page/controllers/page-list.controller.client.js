(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.goToWebsites = goToWebsites;
        vm.goToProfile = goToProfile;
        vm.newPage = newPage;
        vm.newWidget = newWidget;
        vm.editPage = editPage;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
        function goToWebsites() {
            $location.url("/user/"+vm.userId+"/website/");
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
        function newPage() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/new/");
        }
        function newWidget(id) {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+id+"/widget/");
        }
        function editPage(id) {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+id);
        }
    }
})();