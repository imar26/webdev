module.exports = function(app) {
	app.get("/api/page/:pageId/widget", findWidgetsByPageId);
	app.post("/api/page/:pageId/widget", createWidget);
	app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget/", updateWidgetIndex);

	var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://inspirationseek.com/wp-content/uploads/2016/02/Cute-Dog-Golden-Retriever-Pictures.jpg"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://www.youtube.com/watch?v=AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    Array.prototype.move = function(from,to){
        this.splice(to,0,this.splice(from,1)[0]);
        return this;
    }

    function createWidget(req, res) {
    	var pageId = req.params.pageId;

    	var length = widgets.length;
        var widgetObj = {
            _id: '',
            widgetType: '',
            pageId: '',
            size: '',
            text: '',
            url: '',
            width: ''
        }
        widgetObj['_id'] = (length + 1).toString();
        widgetObj['widgetType'] = req.body.widgetType;
        widgetObj['pageId'] = pageId;
        widgetObj['size'] = req.body.size;
        widgetObj['text'] = req.body.text;
        widgetObj['url'] = req.body.url;
        widgetObj['width'] = req.body.width;
        widgets.push(widgetObj);

        res.json(widgetObj);
    }

    function findWidgetById(req, res) {
    	var widgetId = req.params.widgetId;

    	var widgetObj = {
            id: '',
            widgetType: '',
            size: '',
            text: '',
            url: '',
            width: ''
        }
        for(var i=0;i<widgets.length;i++) {
            if(widgets[i]._id == widgetId) {
                widgetObj['id'] = widgets[i]._id;
                widgetObj['widgetType'] = widgets[i].widgetType;
                if(widgets[i].size) {
                	widgetObj['size'] = (widgets[i].size).toString();
                }               
                widgetObj['text'] = widgets[i].text;
                widgetObj['url'] = widgets[i].url;
                widgetObj['width'] = widgets[i].width;
            }
        }
        res.json(widgetObj);
    }

	function findWidgetsByPageId(req, res) {
		var pageId = req.params.pageId;

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
        res.json(widgetsArray);
	}

	function updateWidget(req, res) {
        var widgetId = req.params.widgetId;

        for(var i=0; i<widgets.length;i++) {
            if(widgets[i]._id == widgetId) {
                widgets[i].text = req.body.text;
                widgets[i].size = req.body.size;
                widgets[i].url = req.body.url;
                widgets[i].width = req.body.width;
                res.send(widgets[i]);
            }
        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        for(var i=0; i<widgets.length;i++) {
            if(widgets[i]._id == widgetId) {
                widgets.splice(i, 1);
                res.sendStatus(200);
            }
        }
    }

    function updateWidgetIndex(req, res) {
        var pageId = req.params.pageId;
        var startIndex = req.query.initial;
        var endIndex = req.query.final;
        var widgetObj = {};
        for(var i=0; i<widgets.length;i++) {
            if(widgets[i].pageId == pageId) {
                widgets.move(startIndex,endIndex);
            }
        }
        res.json(widgets);
    }
};