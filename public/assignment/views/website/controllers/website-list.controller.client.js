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
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(
                    function(response) {
                        if(response.data.length > 0) {
                            vm.websites = response.data;
                        } else {
                            vm.noWebsitesFound = 'No websites found';
                        }
                    }, function(response) {
                        console.log(response);
                    });
        }
        init();
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
        function newWebsite() {
            $location.url("/user/"+vm.userId+"/website/new/");
        }
        function newPage(websiteId) {
            $location.url("/user/"+vm.userId+"/website/"+websiteId+"/page/");
        }
        function editWebsite(websiteId) {
            $location.url("/user/"+vm.userId+"/website/"+websiteId);
        }
    }
})();