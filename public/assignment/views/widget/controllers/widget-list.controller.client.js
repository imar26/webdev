(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $location, $sce) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.goToPages = goToPages;
        vm.newWidget = newWidget;
        vm.goToProfile = goToProfile;
        vm.trustSrc = trustSrc;
        vm.editWidget = editWidget;
        vm.safeHtml = safeHtml;

        // $('#widgetList').sortable({
        //     axis: "y"
        // });

        function init() {            
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function(response) {
                    vm.widgets = response.data;
                    console.log(vm.widgets);
                }, function(response) {
                    console.log(response);
                });
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
        function trustSrc(url) {
            url = url.replace("watch?v=", "embed/");
            return $sce.trustAsResourceUrl(url);
        }
        function editWidget(widgetId) {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widgetId);
        }
        function safeHtml(val) {
            return $sce.trustAsHtml(val);
        }
    }
})();