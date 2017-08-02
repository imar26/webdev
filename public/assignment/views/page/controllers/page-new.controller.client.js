(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.goToPages = goToPages;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.createPage = createPage;
        vm.goToProfile = goToProfile;
        function goToPages() {
        	$location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
        }
        function createPage(page) {
        	page = PageService.createPage(vm.websiteId, page);
        	if(page) {
        		$location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
        	} else {
        		vm.alert = "Page could not be created";
        	}
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
    }
})();