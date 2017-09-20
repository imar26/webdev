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

        // var pageId = req.params.pageId;
        // var widgetId = req.params.widgetId;
        // var widgetsArray = [];
        // model
        //     .widgetModel
        //     .findWidgetById(widgetId)
        //     .then(function(status) {
        //         var index = status[0].index;
        //         model
        //             .widgetModel
        //             .findWidgetsByPageId(pageId)
        //             .then(function(widgets) {
        //                 for(var i=0; i<widgets.length;i++) {
        //                     if(widgets[i].index > index) {
        //                         widgetsArray.push(widgets[i]);
        //                     }
        //                 }
        //                 model
        //                     .widgetModel
        //                     .deleteWidget(widgetId, widgetsArray)
        //                     .then(function(status) {
        //                         console.log(status);
        //                     }, function(error) {
        //                         res.sendStatus(404).send(error);
        //                     });
        //             }, function(error) {
        //                 res.sendStatus(404).send(error);
        //             });
        //     }, function(error) {
        //         res.sendStatus(404).send(error);
        //     });
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