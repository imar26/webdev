(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            "createWidget"   : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget,
            "updateWidgetIndex" : updateWidgetIndex
        };
        return api;

        function createWidget(pageId, widget) {            
            return $http.post("/api/page/"+pageId+"/widget", widget);
        }

        function findWidgetsByPageId(pageId) {            
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function findWidgetById(widgetId) {            
            return $http.get("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId, widget);
        }

        function deleteWidget(pageId, widgetId) {
            return $http.delete("/api/page/"+pageId+"/widget/"+widgetId);
        }

        function updateWidgetIndex(pageId, startIndex, endIndex) {
            return $http.put("/api/page/"+pageId+"/widget?initial="+startIndex+"&final="+endIndex);
        }

    }
})();