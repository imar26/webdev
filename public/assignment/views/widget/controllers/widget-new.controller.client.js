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
                        var url = response.filename;
                        addWidget(widget, widgetType, url);
                    },
                    error: function(response) {
                        console.log(response);
                    }
                });
                //Very important line, it disable the page refresh.
                return false;
            });
        }
        function addWidget(widget, widgetType, url) {
        	var widgetFinal = {
        		widgetType: '',
        		text: '',
        		size: '',
        		width: '',
        		url: ''
        	}
        	widgetFinal['widgetType'] = widgetType;
        	widgetFinal['text'] = widget.text;
        	widgetFinal['size'] = widget.size;
        	widgetFinal['width'] = widget.width;
            if(widgetType == 'IMAGE') {
                widgetFinal['url'] = url;
            } else {
                widgetFinal['url'] = widget.url;
            }        	
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
        }
    }
})();