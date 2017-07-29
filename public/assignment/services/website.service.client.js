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

        }

        function findWebsitesByUser(userId) {
            var websitesObj = {
                name : []
            };
            for(var i=0;i<websites.length;i++) {
                if(websites[i].developerId == userId) {
                    websitesObj['name'].push(websites[i].name);
                }
            }
            return websitesObj;
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