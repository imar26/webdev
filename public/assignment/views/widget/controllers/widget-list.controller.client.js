(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.goToPages = goToPages;
        vm.newWidget = newWidget;
        vm.goToProfile = goToProfile;
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();
        function goToPages() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");            
        }
        function newWidget() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new/");
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);   
        }
    }
})();