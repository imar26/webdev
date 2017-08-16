(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetType = $routeParams['wgType'];
        vm.goToWidgetChooser = goToWidgetChooser;
        vm.goToProfile = goToProfile;
        vm.addWidget = addWidget;
        function goToWidgetChooser() {
        	$location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new/");
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
        function addWidget(widget, widgetType) {
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
        	widgetFinal['url'] = widget.url;
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