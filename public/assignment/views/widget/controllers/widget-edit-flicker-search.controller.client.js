(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrEditImageSearchController", FlickrEditImageSearchController);

    function FlickrEditImageSearchController($location, $routeParams, FlickrService, WidgetService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.goToEditImageWidget = goToEditImageWidget;
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
            var widget = {
                widgetType: '',
                url: ''
            };
            widget['widgetType'] = 'IMAGE';
            widget['url'] = url;
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

        function goToEditImageWidget() {
        	$location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
        }

        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
    }
})();