(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "createWidget"   : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            var size = widgets.length;
            var widgetObj = {
                _id: '',
                widgetType: '',
                pageId: '',
                size: '',
                text: '',
                url: '',
                width: ''
            }
            widgetObj['_id'] = size + 1;
            widgetObj['widgetType'] = widget.widgetType;
            widgetObj['pageId'] = pageId;
            widgetObj['size'] = widget.size;
            widgetObj['text'] = widget.text;
            widgetObj['url'] = widget.url;
            widgetObj['width'] = widget.width;
            widgets.push(widgetObj);

            return widgetObj['_id'];
        }

        function findWidgetsByPageId(pageId) {
            var widgetsArray = [];
            var widgetsObj = {
                id: '',
                widgetType: '',
                size: '',
                text: '',
                url: '',
                width: ''
            }
            for(var i=0;i<widgets.length;i++) {
                if(widgets[i].pageId == pageId) {
                    widgetsObj.id = widgets[i]._id;
                    widgetsObj.widgetType = widgets[i].widgetType;
                    widgetsObj.size = widgets[i].size;
                    widgetsObj.text = widgets[i].text;
                    widgetsObj.url = widgets[i].url;
                    widgetsObj.width = widgets[i].width;

                    widgetsArray.push({id: widgetsObj.id, widgetType: widgetsObj.widgetType, size: widgetsObj.size, text: widgetsObj.text, url: widgetsObj.url, width: widgetsObj.width});
                }
            }
            return widgetsArray;
        }

        function findWidgetById(widgetId) {
            var widgetObj = {
                text: '',
                size: ''
            }
            for(var i=0;i<widgets.length;i++) {
                if(widgets[i]._id == widgetId) {
                    widgetObj['text'] = widgets[i].text;
                    widgetObj['size'] = widgets[i].size;
                }
            }
            return widgetObj;
        }

        function updateWidget(widgetId, widget) {

        }

        function deleteWidget(widgetId) {

        }

    }
})();