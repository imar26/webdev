(function () {
    angular
        .module("MoviesApp", ['ngRoute'])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/actor', {
                templateUrl: 'templates/actor-list.view.client.html',
                controller: 'ActorController',
                controllerAs: 'model'
            })
            .when('/movie', {
                templateUrl: 'templates/movie-list.view.client.html',
                controller: 'MovieController',
                controllerAs: 'model'
            })
            .otherwise({
                templateUrl: 'templates/actor-list.view.client.html',
                controller: 'ActorController',
                controllerAs: 'model'
            });
    }
})();