module.exports = function(app) {
	require('./services/actor.service.server.js')(app);
	require('./services/movie.service.server.js')(app);
};