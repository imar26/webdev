var pg = require('pg');
var config = {
	user: 'postgres',
	database: 'postgres',
	password: 'postgres',
	host: 'localhost',
	post: 5432,
	max: 10,
	idleTimeoutMillis: 30000,
};
var client = new pg.Client(config);
client.connect(function(err, client, done) {
	if(err) {
		return console.error('error fetching client from postgres');
	}
});

module.exports = client;