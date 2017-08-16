module.exports = function(app) {
	app.post("/api/user/:userId/website", createWebsite);
	app.get("/api/user/:userId/website", findWebsitesByUser);
	app.get("/api/website/:websiteId", findWebsiteById);
	app.put("/api/website/:websiteId", updateWebsite);
	app.delete("/api/website/:websiteId", deleteWebsite);

	var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", "created": new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", "created": new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "123", "description": "Lorem", "created": new Date() },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem", "created": new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", "created": new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", "created": new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", "created": new Date() }
    ];

    function createWebsite(req, res) {
    	var userId = req.params.userId;
    	var size = websites.length;
        var websitesObj = {
            _id: '',
            name : '',
            developerId : '',
            description : '',
            created: ''
        };
        size = size + 1;
        websitesObj['_id'] = size.toString();
        websitesObj['name'] = req.body.name;
        websitesObj['developerId'] = userId;
        websitesObj['description'] = req.body.description;
        websitesObj['created'] = new Date();
        websites.push(websitesObj);
        res.json(websitesObj);
    }

    function findWebsiteById(req, res) {
    	var websiteId = req.params.websiteId;
        var websiteObj = {
            name : [],
            description: []
        };
        for(var i=0; i<websites.length;i++) {
            if(websites[i]._id == websiteId) {
                websiteObj['name'] = websites[i].name;
                websiteObj['description'] = websites[i].description;
            }
        }
        res.json(websiteObj);
    }

    function findWebsitesByUser(req, res) {
    	var userId = req.params.userId;

    	var websiteArray = [];
        var websitesObj = {
            id : '',
            name : '',
            created : '',
            developerId : ''
        };
        for(var i=0;i<websites.length;i++) {
            if(websites[i].developerId == userId) {
                websitesObj.id = websites[i]._id;
                websitesObj.name = websites[i].name;
                websitesObj.created = websites[i].created;
                websitesObj.developerId = websites[i].developerId;

                websiteArray.push({id: websitesObj.id, name: websitesObj.name, created: websitesObj.created, developerId: websitesObj.developerId});
            }
        }
        res.send(websiteArray);
    }

    function updateWebsite(req, res) {
    	var websiteId = req.params.websiteId;

    	for(var i=0; i<websites.length;i++) {
            if(websites[i]._id == websiteId) {
                websites[i].name = req.body.name;
                websites[i].description = req.body.description;
                res.json(websites[i]);
            }
        }
    }

    function deleteWebsite(req, res) {
    	var websiteId = req.params.websiteId;

    	for(var i=0; i<websites.length;i++) {
            if(websites[i]._id == websiteId) {
                websites.splice(i, 1);
                res.sendStatus(200);
            }
        }
    }
};