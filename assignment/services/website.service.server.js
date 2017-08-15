module.exports = function(app) {
	app.get("/api/user/:userId/website", findWebsitesByUser);

	var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", "created": new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", "created": new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "123", "description": "Lorem", "created": new Date() },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem", "created": new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", "created": new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", "created": new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", "created": new Date() }
    ];

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
};