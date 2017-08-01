(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage"   : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        };
        return api;

        function createPage(websiteId, page) {
            var size = pages.length;
            var pagesObj = {
                _id: '',
                name : '',
                websiteId : '',
                description : ''
            };
            size = size + 1;
            pagesObj['_id'] = size.toString();
            pagesObj['name'] = page.name;
            pagesObj['websiteId'] = websiteId;
            pagesObj['description'] = page.description;
            pages.push(pagesObj);
            return pagesObj['_id'];
        }

        function findPageByWebsiteId(websiteId) {
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
            return pagesArray;
        }

        function findPageById(pageId) {
            var pageObj = {
                name : ''
            };
            for(var i=0; i<pages.length;i++) {
                if(pages[i]._id == pageId) {
                    pageObj['name'] = pages[i].name;
                }
            }
            return pageObj;
        }

        function updatePage(pageId, page) {

        }

        function deletePage(pageId) {

        }

    }
})();