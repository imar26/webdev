module.exports = function(app) {
	app.post('/api/actor', createActor);
	app.get('/api/actor', findAllActors);
	app.delete('/api/actor/:actorId', deleteActor);

	var ActorModel = require('../models/actor.model.server.js')();

	function createActor(req, res) {
		ActorModel
			.createActor(req.body)
			.then(function(actor) {
				res.send(200);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function findAllActors(req, res) {
		ActorModel
			.findAllActors()
			.then(function(actors) {
				res.json(actors);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function deleteActor(req, res) {
		var actorId = req.params.actorId;
		ActorModel
			.deleteActor(actorId)
			.then(function(actor) {
				res.sendStatus(200).send(actor);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

};