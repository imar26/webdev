module.exports = function(app, model) {
	app.post("/api/user/:userId/website", createWebsite);
	app.get("/api/user/:userId/website", findWebsitesByUser);
	app.get("/api/website/:websiteId", findWebsiteById);
	app.put("/api/website/:websiteId", updateWebsite);
	app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
    	var userId = req.params.userId;
    	
        model
            .websiteModel
            .createWebsite(userId, req.body)
            .then(function(website) {
                res.sendStatus(200).send(website);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

    function findWebsiteById(req, res) {
    	var websiteId = req.params.websiteId;
        
        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(function(website) {
                res.json(website);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

    function findWebsitesByUser(req, res) {
    	var userId = req.params.userId;

    	model
            .websiteModel
            .findWebsitesByUser(userId)
            .then(function(websites) {
                res.json(websites);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

    function updateWebsite(req, res) {
    	var websiteId = req.params.websiteId;

    	model
            .websiteModel
            .updateWebsite(websiteId, req.body)
            .then(function(website) {
                res.json(website);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

    function deleteWebsite(req, res) {
    	var websiteId = req.params.websiteId;

    	model
            .websiteModel
            .deleteWebsite(websiteId)
            .then(function(website) {
                res.sendStatus(200);
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }
};