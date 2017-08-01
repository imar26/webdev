(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "123", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "createWebsite"   : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            var size = websites.length;
            var websitesObj = {
                _id: '',
                name : '',
                developerId : '',
                description : ''
            };
            size = size + 1;
            websitesObj['_id'] = size.toString();
            websitesObj['name'] = website.name;
            websitesObj['developerId'] = userId;
            websitesObj['description'] = website.description;
            websites.push(websitesObj);
            return websitesObj['_id'];
        }

        function findWebsitesByUser(userId) {
            var websiteArray = [];
            var websitesObj = {
                id : '',
                name : ''
            };
            for(var i=0;i<websites.length;i++) {
                if(websites[i].developerId == userId) {
                    websitesObj.id = websites[i]._id;
                    websitesObj.name = websites[i].name;

                    websiteArray.push({id: websitesObj.id, name: websitesObj.name});
                }
            }
            return websiteArray;
        }

        function findWebsiteById(websiteId) {
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
            return websiteObj;
        }

        function updateWebsite(websiteId, website) {

        }

        function deleteWebsite(websiteId) {

        }

    }
})();