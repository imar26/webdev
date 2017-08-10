(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        vm.goToWidgets = goToWidgets;
        vm.goToProfile = goToProfile;
        vm.editWidget = editWidget;
        vm.deleteWidget = deleteWidget;
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();
        function goToWidgets() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);   
        }
        function editWidget(widget) {
            widget = WidgetService.updateWidget(vm.widgetId, widget);
            if(widget) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
            }
        }
        function deleteWidget() {
            widget = WidgetService.deleteWidget(vm.widgetId);
            if(widget) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
            }
        }
    }
})();