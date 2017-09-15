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

    	var size = pages.length;
        var pagesObj = {
            _id: '',
            name : '',
            websiteId : '',
            description : ''
        };
        size = size + 1;
        pagesObj['_id'] = size.toString();
        pagesObj['name'] = req.body.name;
        pagesObj['websiteId'] = websiteId;
        pagesObj['description'] = req.body.description;
        pages.push(pagesObj);
        res.json(pagesObj);
    }

    function findPageById(req, res) {
		var pageId = req.params.pageId;

		var pageObj = {
            name : '',
            description : ''
        };
        for(var i=0; i<pages.length;i++) {
            if(pages[i]._id == pageId) {
                pageObj['name'] = pages[i].name;
                pageObj['description'] = pages[i].description;
            }
        }
        res.json(pageObj);
    }

    function findPageByWebsiteId(req, res) {
    	var websiteId = req.params.websiteId;

    	var pagesArray = [];
        var pagesObj = {
            id : '',
            name : ''
        };
        for(var i=0; i<pages.length;i++) {
            if(pages[i].websiteId == websiteId) {
                pagesObj.id = pages[i]._id;
                pagesObj.name = pages[i].name;

                pagesArray.push({id: pagesObj.id, name: pagesObj.name});
            }
        }
        res.send(pagesArray);
    }

    function updatePage(req, res) {
    	var pageId = req.params.pageId;

    	for(var i=0; i<pages.length;i++) {
            if(pages[i]._id == pageId) {
                pages[i].name = req.body.name;
                pages[i].description = req.body.description;
                res.send(pages[i]);
            }
        }
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