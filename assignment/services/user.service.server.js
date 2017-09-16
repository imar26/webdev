module.exports = function(app, model) {
	app.get("/api/user", findUser);
	app.get("/api/user/:userId", findUserById);
	app.put("/api/user/:userId", updateUser);
	app.post("/api/user", createUser);

    function createUser(req, res) {
		var password = req.body.password;
		var verifypassword = req.body.verifypassword;
		if(password === verifypassword) {
			model
				.userModel
				.createUser(req.body)
				.then(function(status) {
					res.json(status);
				}, function(error) {
					res.sendStatus(404).send(error);
				});
		} else {
			res.sendStatus(404);
		}
    }

    function findUser(req, res) {
		var username = req.query.username;
		var password = req.query.password;
		if(username && password) {
			findUserByCredentials(req, res);
		} else if (username) {
			findUserByUsername(req, res);
		}
	}

	function findUserByCredentials(req, res) {
		var username = req.query.username;
		var password = req.query.password;
		model
			.userModel
			.findUserByCredentials(username)
			.then(function(user) {
				// res.json(user);
				if(user.password === password) {
					res.json(user);
				} else {
					res.sendStatus(404);
				}
			}, function(error) {
				res.sendStatus(404).send(error);
			});
	}

	function findUserByUsername(req, res) {
		var username = req.query.username;
		model
			.userModel
			.findUserByUsername(username)
			.then(function(user) {
				res.json(user);
			}, function(error) {
				res.sendStatus(404).send(error);
			});
	}

	function findUserById(req, res) {
		var userId = req.params.userId;
		model
			.userModel
			.findUserById(userId)
			.then(function(user) {
				res.json(user);
			}, function(error) {
				res.sendStatus(404).send(error);
			});
	}

	function updateUser(req, res) {
		var userId = req.params.userId; 
  		model
  			.userModel
  			.updateUser(userId, req.body)
  			.then(function(user) {
				res.json(user);
			}, function(error) {
				res.sendStatus(404).send(error);
			});
	}
}