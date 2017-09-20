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
        vm.uploadImage = uploadImage;
        vm.nullPath = nullPath;
        vm.searchFlicker = searchFlicker;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function(response) {
                    vm.widget = response.data[0];
                    if(vm.widget.widgetType == 'HEADING') {
                        vm.widget.size = vm.widget.size.toString();
                    }
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
        function uploadImage(widget) {
            var widget = widget;
            $("#uploadImage").on('submit', function() {
                $(this).ajaxSubmit({
                    success: function(response) {
                        var path = response.filename;
                        widget.path = path;
                        editWidget(widget);
                    },
                    error: function(response) {
                        console.log(response);
                    }
                });
                //Very important line, it disable the page refresh.
                return false;
            });
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
                .deleteWidget(vm.pageId, vm.widgetId)
                .then(function(response) {
                    widget = response.data;
                    if(widget) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
                    }
                }, function(response) {
                    console.log(response);
                });
        }
        function nullPath() {
            vm.widget.path = '';
        }
        function searchFlicker() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/edit/"+vm.widgetId+"/search/");
        }
    }
})();