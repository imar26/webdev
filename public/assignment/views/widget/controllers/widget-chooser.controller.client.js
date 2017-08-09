(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($location, $routeParams) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.goToWidgets = goToWidgets;
        vm.createWidget = createWidget;
        vm.goToProfile = goToProfile;
        function goToWidgets() {
        	$location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
        }
        function createWidget(widgetType) {
        	$location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/create/"+widgetType);
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
    }
})();