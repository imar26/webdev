(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
		function init() {
			vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
			console.log(vm.websites);
            vm.website = {
            	name: '',
            	description: ''
            };
            var n = Object.keys(vm.websites).length;
            for(var i=0; i<n; i++) {
            	if(vm.websites[i].id == vm.websiteId) {
            		// vm.website['name'] = vm.websites[i].name;
            		// vm.website['description'] = vm.websites[i].description;
            	}
            }
		}
		init();
    }
})();