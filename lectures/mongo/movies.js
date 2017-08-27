module.exports = function (app) {

    app.get('/api/movie', findAllMovies);
    app.post('/api/movie', createMovie);
    app.get('/api/movie/:movieId', findMovieById);
    app.put('/api/movie/:movieId', updateMovie);
    app.delete('/api/movie/:movieId', deleteMovieById);

    var mongoose = require('mongoose');

    var MovieSchema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        rating: {
            type: String,
            enum: ['G', 'PG', 'PG-13', 'R']
        },
        plot: String,
        cast: [String],
        poster: String,
        releasedDate: Date,
        boxOffice: Number,
        created: {
            type: Date,
            default: Date.now
        }
    }, {
        collection: 'movieDB'
    });

    var MovieModel = mongoose.model('MovieModel', MovieSchema);

    function findAllMovies(req, res) {
        MovieModel
            .find()
            .then(function (response) {
                res.json(response);
            });
    }

    function findMovieById(req, res) {
        var movieId = req.params.movieId;

        MovieModel
            .findById({_id: movieId})
            .then(function (response) {
                res.json(response);
            }, function (response) {
                console.log(response);
            })
    }

    function createMovie(req, res) {
        var movie = req.body;
        MovieModel
            .create(movie)
            .then(function (movie) {
                res.json(movie);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function deleteMovieById(req, res) {
        var movieId = req.params.movieId;

        MovieModel
            .remove({_id : movieId})
            .then(function (response) {
                res.sendStatus(200).send(response);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function updateMovie(req, res) {
        var movieId = req.params.movieId;
        var movie = req.body;

        MovieModel
            .update(
                {_id : movieId},
                {$set: {title: movie.title}}
            )
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    // MovieModel.create({
    //     title: 'Aliens',
    //     cast: ['Sigourney Wiever', 'Hrithik Roshan']
    // });

    // MovieModel
    //     .update({_id : '59a20c96aea2e60b24566d38'},
    //         {$set: {rating: 'R'}})
    //     .then(function (response) {
    //         console.log(response);
    //     }, function () {
    //
    //     });
};