module.exports = function(app, model) {
	app.get("/api/website/:websiteId/page", findPageByWebsiteId);
	app.post("/api/website/:websiteId/page", createPage);
	app.get("/api/page/:pageId", findPageById);
	app.put("/api/page/:pageId", updatePage);
	app.delete("/api/page/:pageId", deletePage);

	var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

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

    	for(var i=0; i<pages.length;i++) {
            if(pages[i]._id == pageId) {
                pages.splice(i, 1);
                res.sendStatus(200);
            }
        }
    }

};