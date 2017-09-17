module.exports = function(app, model) {
	app.get("/api/website/:websiteId/page", findPageByWebsiteId);
	app.post("/api/website/:websiteId/page", createPage);
	app.get("/api/page/:pageId", findPageById);
	app.put("/api/page/:pageId", updatePage);
	app.delete("/api/page/:pageId/website/:websiteId", deletePage);

    function createPage(req, res) {
    	var websiteId = req.params.websiteId;

    	model
            .pageModel
            .createPage(websiteId, req.body)
            .then(function(page) {
                res.json(page);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

    function findPageById(req, res) {
		var pageId = req.params.pageId;

		model
            .pageModel
            .findPageById(pageId)
            .then(function(page) {
                res.json(page);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

    function findPageByWebsiteId(req, res) {
    	var websiteId = req.params.websiteId;

    	model
            .pageModel
            .findPageByWebsiteId(websiteId)
            .then(function(page) {
                res.json(page);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

    function updatePage(req, res) {
    	var pageId = req.params.pageId;

    	model
            .pageModel
            .updatePage(pageId, req.body)
            .then(function(page) {
                res.json(page);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
    	var websiteId = req.params.websiteId;

    	model
            .pageModel
            .deletePage(pageId, websiteId)
            .then(function(page) {
                res.json(page);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

};