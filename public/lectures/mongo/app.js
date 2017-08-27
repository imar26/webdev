(function () {
    angular
        .module("MovieApp", [])
        .controller("MovieController", MovieController);

    function MovieController($http, $window) {
        var vm = this;

        vm.createMovie = createMovie;
        vm.deleteMovie = deleteMovie;
        vm.selectMovie = selectMovie;
        vm.updateMovie = updateMovie;

        function init() {
            findAllMovies();
        }
        init();

        function createMovie(movie) {
            $http.post("/api/movie/", movie).then(function () {
                $window.location.reload();
            });
        }

        function findAllMovies() {
            $http.get("/api/movie/")
                .then(function (movies) {
                    vm.movies = movies.data;
                });
        }
        
        function deleteMovie(id) {
            $http.delete("/api/movie/"+id)
                .then(function () {
                    $window.location.reload();
                });
        }

        function selectMovie(id) {
            $http.get("/api/movie/"+id)
                .then(function (movie) {
                    vm.movie = movie.data;
                });
        }

        function updateMovie(movie) {
            $http.put("/api/movie/"+movie._id, movie)
                .then(function (movies) {
                    $window.location.reload();
                });
        }
    }
})();