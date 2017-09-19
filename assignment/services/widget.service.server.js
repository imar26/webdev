module.exports = function(app, model) {
    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '././public/assignment/uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + file.originalname.replace(/\..+$/, '') + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
    var upload = multer({ storage: storage });

	app.get("/api/page/:pageId/widget", findWidgetsByPageId);
	app.post("/api/page/:pageId/widget", createWidget);
	app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget/", updateWidgetIndex);
    app.post("/api/upload/", upload.single('myFile'), uploadImage);

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

    	model
            .widgetModel
            .createWidget(pageId, req.body)
            .then(function(status) {
                res.json(status);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

    function findWidgetById(req, res) {
    	var widgetId = req.params.widgetId;

    	model
            .widgetModel
            .findWidgetById(widgetId)
            .then(function(widget) {
                res.json(widget);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

	function findWidgetsByPageId(req, res) {
		var pageId = req.params.pageId;

		model
            .widgetModel
            .findWidgetsByPageId(pageId)
            .then(function(widgets) {
                res.json(widgets);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
	}

	function updateWidget(req, res) {
        var widgetId = req.params.widgetId;

        model
            .widgetModel
            .updateWidget(widgetId, req.body)
            .then(function(widget) {
                res.json(widget);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
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

    function uploadImage(req, res) {
        res.json(req.file);
    }
};