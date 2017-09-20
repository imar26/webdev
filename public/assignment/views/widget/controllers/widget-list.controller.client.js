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

        function sortByAttribute(array, ...attrs) {
            // generate an array of predicate-objects contains
            // property getter, and descending indicator
            let predicates = attrs.map(pred => {
                let descending = pred.charAt(0) === '-' ? -1 : 1;
                pred = pred.replace(/^-/, '');
                return {
                    getter: o => o[pred],
                    descend: descending
                };
            });
            // schwartzian transform idiom implementation. aka: "decorate-sort-undecorate"
            return array.map(item => {
                    return {
                        src: item,
                        compareValues: predicates.map(predicate => predicate.getter(item))
                    };
                })
                .sort((o1, o2) => {
                    let i = -1,
                        result = 0;
                    while (++i < predicates.length) {
                        if (o1.compareValues[i] < o2.compareValues[i]) result = -1;
                        if (o1.compareValues[i] > o2.compareValues[i]) result = 1;
                        if (result *= predicates[i].descend) break;
                    }
                    return result;
                })
                .map(item => item.src);
        }
        var widgetsArray = [];
        function init() {            
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function(response) {
                    widgetsArray = response.data;
                    vm.widgets = sortByAttribute(widgetsArray, 'index');
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