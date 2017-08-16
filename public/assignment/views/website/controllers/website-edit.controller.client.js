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
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function(response) {
                    vm.website = response.data;
                }, function(response) {
                    console.log(response);
                });
		}
		init();
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
        function goToWebsites() {
            $location.url("/user/"+vm.userId+"/website/");
        }
        function updateWebsite(website) {            
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .then(function(response) {
                    website = response.data;
                    if(website) {
                        $location.url("/user/"+vm.userId+"/website/");
                    }
                }, function(response) {
                    console.log(response);
                });
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function(response) {
                    website = response.data;
                    if(website) {
                        $location.url("/user/"+vm.userId+"/website/");
                    }
                }, function(response) {
                    console.log(response);
                });            
        }

    }
})();