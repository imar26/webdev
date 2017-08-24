(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams) {
        var vm = this;

        vm.wgType = $routeParams['wgType'];
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.goToCreateImageWidget = goToCreateImageWidget;
        vm.goToProfile = goToProfile;
        vm.searchImages = searchImages;

        function searchImages(value) {
        	console.log(value);
        }

        function goToCreateImageWidget() {
        	$location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/create/"+vm.wgType);
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
    }
})();