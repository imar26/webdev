module.exports = function (app) {
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

    MovieModel
        .remove({_id : '59a20c96aea2e60b24566d38'})
        .then(function (response) {
            console.log(response);
        }, function (response) {
            console.log(response);
        });
};