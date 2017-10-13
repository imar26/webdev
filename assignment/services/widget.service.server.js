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
    app.delete("/api/page/:pageId/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget/", updateWidgetIndex);
    app.post("/api/upload/", upload.single('myFile'), uploadImage);

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
        var pageId = req.params.pageId;
        var widgetId = req.params.widgetId;

        model
            .widgetModel
            .deleteWidget(pageId, widgetId)
            .then(function(status) {
                res.json(status);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

    function updateWidgetIndex(req, res) {
        var pageId = req.params.pageId;
        var startIndex = req.query.initial;
        var endIndex = req.query.final;
        model
            .widgetModel
            .updateWidgetIndex(pageId, startIndex, endIndex)
            .then(function(status) {
                res.json(status);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

    function uploadImage(req, res) {
        console.log(req.file);
        res.json(req.file);
    }
};