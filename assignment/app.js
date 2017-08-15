module.exports = function(app) {
	app.get("/api/user", findUserByCredentials);
	app.get("/api/user/:userId", findUserById);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "aw@gmail.com"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bm@gmail.com"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "cg@gmail.com"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "ja@gmail.com" }
    ];

	function findUserByCredentials(req, res) {
		var username = req.query.username;
		var password = req.query.password;
		var user = users.find(function(user) {
        	return user.username === username && user.password === password;
		}); 
		res.json(user);
	}

	function findUserById(req, res) {
		var userId = req.params.userId;
		var user = users.find(function(user) {
        	return user._id === userId;
		});
		res.json(user);
	}
}