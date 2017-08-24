(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "0711ca77055a6857a51c1947549a587a";
    var secret = "e2274d7d44c4a5e4";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http) {
        var api = {
            "searchImages"   : searchImages
        };
        return api;

        function searchImages(searchValue) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchValue);
            return $http.get(url);
        }

    }
})();