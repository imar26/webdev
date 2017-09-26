var client = require('./client');
var q = require('q');

function findAllActors() {
	var sql = "select * from webdev.actor;";
	client.query(sql, function(err, actors) {
		console.log(actors);
	});
}

function createActor(actor) {
	var sql = "INSERT INTO webdev.actor(name) VALUES ('"+actor.name+"');";
	client.query(sql, function(err, actor) {
		console.log(actor);
	});
}

// findAllActors();

createActor({name: 'Will Smith'});