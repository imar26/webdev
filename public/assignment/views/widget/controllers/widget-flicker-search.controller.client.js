(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, FlickrService, WidgetService) {
        var vm = this;

        vm.wgType = $routeParams['wgType'];
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.goToCreateImageWidget = goToCreateImageWidget;
        vm.goToProfile = goToProfile;
        vm.searchImages = searchImages;
        vm.selectPhoto = selectPhoto;

        function searchImages(value) {
        	FlickrService
        		.searchImages(value)
        		.then(function(response) {
        			data = response.data.replace("jsonFlickrApi(","");
		            data = data.substring(0,data.length - 1);
		            data = JSON.parse(data);
		            vm.photos = data.photos;
        		}, function(response) {
        			console.log(response);
        		});
        }

        function selectPhoto(photo) {
        	var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";

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
                    widgetFinal['widgetType'] = vm.wgType;
                    widgetFinal['width'] = "100%";
                    widgetFinal['url'] = url; 
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

        function goToCreateImageWidget() {
        	$location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/create/"+vm.wgType);
        }

        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
    }
})();