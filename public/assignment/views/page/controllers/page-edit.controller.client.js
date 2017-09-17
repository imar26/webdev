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
            PageService
                .findPageById(vm.pageId)
                .then(function(response) {
                    vm.page = response.data;
                }, function(response) {
                    console.log(response);
                });
        }
        init();
        function goToPages() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
        function updatePage(page) {
            PageService
                .updatePage(vm.pageId, page)
                .then(function(response) {
                    page = response.data;
                    if(page) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
                    }
                }, function(response) {
                    console.log(response);
                });            
        }
        function deletePage() {
            PageService
                .deletePage(vm.pageId, vm.websiteId)
                .then(function(response) {
                    page = response.data;
                    if(page) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
                    }
                }, function(response) {
                    console.log(response);
                });            
        }
    }
})();