(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($location, $routeParams, WidgetService, $http) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetType = $routeParams['wgType'];
        vm.goToWidgetChooser = goToWidgetChooser;
        vm.goToProfile = goToProfile;
        vm.addWidget = addWidget;
        vm.uploadImage = uploadImage;
        vm.searchFlicker = searchFlicker;
        vm.wgType = $routeParams['wgType'];
        function goToWidgetChooser() {
        	$location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new/");
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
        function uploadImage(widget, widgetType) {
            var widget = widget;
            var widgetType = widgetType;
            $("#uploadImage").on('submit', function() {
                $(this).ajaxSubmit({
                    success: function(response) {
                        var path = response.filename;
                        addWidget(widget, widgetType, path);
                    },
                    error: function(response) {
                        console.log(response);
                    }
                });
                //Very important line, it disable the page refresh.
                return false;
            });
        }
        function addWidget(widget, widgetType, path) {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function(response) {
                    vm.widgets = response.data;

                    var widgetFinal = {
                        widgetType: '',
                        text: '',
                        size: '',
                        width: '',
                        url: '',
                        path: '',
                        index: ''
                    }
                    widgetFinal['widgetType'] = widgetType;
                    widgetFinal['text'] = widget.text;
                    widgetFinal['size'] = widget.size;
                    widgetFinal['width'] = widget.width;
                    widgetFinal['url'] = widget.url;
                    widgetFinal['path'] = path; 
                    widgetFinal['index'] = vm.widgets.length; 

                    WidgetService
                        .createWidget(vm.pageId, widgetFinal)
                        .then(function(response) {
                            widget = response.data;
                            if(widget) {
                                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
                            } else {
                                vm.alert = "Widget could not be created.";
                            }
                        }, function(response) {
                            console.log(response);
                        });
                }, function(response) {
                    console.log(response);
                });
        	        
        }
        function searchFlicker() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/create/"+vm.wgType+"/search/");
        }
    }
})();