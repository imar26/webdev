(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.createWebsite = createWebsite;
        vm.goToWebsites = goToWebsites;
        vm.goToProfile = goToProfile;
        function createWebsite(website) {
        	website = WebsiteService.createWebsite(vm.userId, website);
        	if(website) {
        		$location.url("/user/"+vm.userId+"/website/");
        	} else {
        		vm.alert = "Website could not be created";
        	}
        }
        function goToWebsites() {
            $location.url("/user/"+vm.userId+"/website/");
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
    }
})();