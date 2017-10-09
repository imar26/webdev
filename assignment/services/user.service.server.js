module.exports = function(app, model) {
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;

	passport.use(new LocalStrategy(localStrategy));
	passport.serializeUser(serializeUser);
	passport.deserializeUser(deserializeUser);

	app.get("/api/user", findUser);
	app.get("/api/user/:userId", findUserById);
	app.put("/api/user/:userId", updateUser);
	app.post("/api/user", createUser);
	app.delete("/api/user/:userId", deleteUser);
	app.post("/api/login", passport.authenticate('local'), login);
	app.post("/api/logout", logout);
	app.post("/api/register", register);
	app.get("/api/loggedin", loggedin);	

	function localStrategy(username, password, done) {
	    model
	    	.userModel
	        .findUserByCredentials(username, password)
	        .then(
	            function(user) {
	                if(user.username === username && user.password === password) {
	                    return done(null, user);
	                } else {
	                    return done(null, false);
	                }
	            },
	            function(err) {
	                if (err) { return done(err); }
	            }
	        );
	}


	function serializeUser(user, done) {
	    done(null, user);
	}

	function deserializeUser(user, done) {
	    model
			.userModel
	        .findUserById(user._id)
	        .then(
	            function(user){
	                done(null, user);
	            },
	            function(err){
	                done(err, null);
	            }
	        );
	}

	function login(req, res) {
	    var user = req.user;
	    res.json(user);
	}

	function logout(req, res) {
	    req.logOut();
	    res.send(200);
	}

	function register(req, res) {
	    var user = req.body;
	    if(user.password === user.verifypassword) {
		    model
		    	.userModel
		        .createUser(user)
		        .then(
		            function(user){
		                if(user){
		                    req.login(user, function(err) {
		                        if(err) {
		                            res.status(400).send(err);
		                        } else {
		                            res.json(user);
		                        }
		                    });
		                }
		            }
		        );
		} else {
			res.sendStatus(404);
		}
	}

	function loggedin(req, res) {
	    res.send(req.isAuthenticated() ? req.user : '0');
	}

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
				if(user == null) {
					res.sendStatus(404);
				} else if(user.password === password) {
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

	function deleteUser(req, res) {
		var userId = req.params.userId;

		model
			.userModel
			.deleteUser(userId)
			.then(function(user) {
				res.json(user);
			}, function(error) {
				res.sendStatus(404).send(error);
			});
	}
}