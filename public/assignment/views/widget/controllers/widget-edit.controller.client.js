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
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function(response) {
                    vm.widget = response.data;
                }, function(response) {
                    console.log(response);
                });
        }
        init();
        function goToWidgets() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);   
        }
        function editWidget(widget) {
            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(function(response) {
                    widget = response.data;
                    if(widget) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
                    }
                }, function(response) {
                    console.log(response);
                });
        }
        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function(response) {
                    widget = response.data;
                    if(widget) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
                    }
                }, function(response) {
                    console.log(response);
                });
        }
    }
})();