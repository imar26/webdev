(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", "created": new Date() },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", "created": new Date() },
            { "_id": "456", "name": "Gizmodo",     "developerId": "123", "description": "Lorem", "created": new Date() },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem", "created": new Date() },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", "created": new Date() },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", "created": new Date() },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", "created": new Date() }
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
            return $http.post("/api/user/"+userId+"/website", website);
        }

        function findWebsitesByUser(userId) {            
            return $http.get("/api/user/"+userId+"/website");
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
            for(var i=0; i<websites.length;i++) {
                if(websites[i]._id == websiteId) {
                    websites[i].name = website.name;
                    websites[i].description = website.description;
                    return true;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for(var i=0; i<websites.length;i++) {
                if(websites[i]._id == websiteId) {
                    websites.splice(i, 1);
                    return true;
                }
            }
        }

    }
})();