(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams['pid'];
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            vm.widgets = vm.widgets.text;
        }
        init();
    }
})();