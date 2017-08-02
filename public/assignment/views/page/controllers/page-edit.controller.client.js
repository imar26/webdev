(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.goToPages = goToPages;
        vm.goToProfile = goToProfile;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function init() {
            vm.page = PageService.findPageById(vm.pageId);
            console.log(vm.page);
        }
        init();
        function goToPages() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
        function updatePage(page) {
            page = PageService.updatePage(vm.pageId, page);
            if(page) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
            }
        }
        function deletePage() {
            page = PageService.deletePage(vm.pageId);
            if(page) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
            }
        }
    }
})();