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
            WebsiteService
                .createWebsite(vm.userId, website)
                .then(function(response) {
                    website = response.data;
                    if(website) {
                        $location.url("/user/"+vm.userId+"/website/");
                    } else {
                        vm.alert = "Website could not be created";
                    }
                }, function(response) {
                    console.log(response);
                });
        }
        function goToWebsites() {
            $location.url("/user/"+vm.userId+"/website/");
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
    }
})();