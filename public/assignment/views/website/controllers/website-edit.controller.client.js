(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.goToProfile = goToProfile;
        vm.goToWebsites = goToWebsites;
		function init() {
			vm.website = WebsiteService.findWebsiteById(vm.websiteId);
		}
		init();
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
        function goToWebsites() {
            $location.url("/user/"+vm.userId+"/website/");
        }
        function updateWebsite(website) {
            website = WebsiteService.updateWebsite(vm.websiteId, website);
            if(website) {
                $location.url("/user/"+vm.userId+"/website/");
            }
        }

        function deleteWebsite() {
            website = WebsiteService.deleteWebsite(vm.websiteId);
            if(website) {
                $location.url("/user/"+vm.userId+"/website/");
            }
        }

    }
})();