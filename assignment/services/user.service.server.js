module.exports = function(app, model) {
	app.get("/api/user", findUser);
	app.get("/api/user/:userId", findUserById);
	app.put("/api/user/:userId", updateUser);
	app.post("/api/user", createUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "aw@gmail.com"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bm@gmail.com"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "cg@gmail.com"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "ja@gmail.com" }
    ];

    function createUser(req, res) {
  //   	var username = req.body.username;
		var password = req.body.password;
		var verifypassword = req.body.verifypassword;
		if(password === verifypassword) {
			model
				.userModel
				.createUser(req.body)
				.then(function(status) {
					console.log("createUser status- " + status);
					res.json(status);
				}, function(error) {
					console.log("createUser error- " + error);
					res.sendStatus(404).send(error);
				});
		} else {
			res.sendStatus(404);
		}
		// var size = users.length;
		// var userObj = {
  //           _id: '',
  //           username : '',
  //           password : ''
  //       };
		// if(password === verifypassword) {
		// 	userObj['_id'] = (size + 1).toString();
		// 	userObj['username'] = username;
		// 	userObj['password'] = password;
		// 	users.push(userObj);
		// }
		// res.json(userObj);
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
		var user = users.find(function(user) {
        	return user.username === username && user.password === password;
		}); 
		res.json(user);
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
		// var user = users.find(function(user) {
  //       	return user.username === username;
		// });
		// if(user) {
		// 	res.json(user);
		// 	return;
		// } else {
		// 	res.sendStatus(404).send({message: 'User not found.'});
		// 	return;
		// }
	}

	function findUserById(req, res) {
		var userId = req.params.userId;
		var user = users.find(function(user) {
        	return user._id === userId;
		});
		res.json(user);
	}

	function updateUser(req, res) {
		var userId = req.params.userId;
		for(var i=0; i<users.length;i++) {
            if(users[i]._id == userId) {
                users[i].username = req.body.username;
                users[i].firstName = req.body.firstName;
                users[i].lastName = req.body.lastName;
                users[i].email = req.body.email;
                res.json(users[i]);
                return;
            }
        } 
	}
}