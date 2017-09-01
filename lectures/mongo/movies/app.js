module.exports = function(app) {
	var ActorModel = require('./models/actor.model.server.js')();
	var MovieModel = require('./models/movie.model.server.js')();

	var model = {
		ActorModel: ActorModel,
		MovieModel: MovieModel
	};

	require('./services/actor.service.server.js')(app, model);
	require('./services/movie.service.server.js')(app, model);
};