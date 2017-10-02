module.exports = function(app) {

	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	passport.use(new LocalStrategy(localStrategy));

	var userModel = require('../models/user.model.server.js');

	passport.serializeUser(serializeUser);
	passport.deserializeUser(deserializeUser);

	app.post('/api/passportlogin', passport.authenticate('local'), login);
	app.post('/api/passportloggedin', loggedin);
	app.post('/api/passportlogout', logout);
	app.post('/api/passportregister', register);
	app.post('/api/isAdmin', isAdmin);
	app.get('/api/passportFindAllUsers', passportFindAllUsers);
	app.delete('/api/deleteUser/:userId', deleteUser);

	function localStrategy(username, password, done) {
	    userModel
	        .findUserByCredentials(username, password)
	        .then(
	            function(user) {
	                if (!user) { return done(null, false); }
	                return done(null, user);
	            },
	            function(err) {
	                if (err) { return done(err); }
	            }
	        );
	}

	function login(req, res) {
	    var user = req.user;
	    res.json(user);
	}

	function serializeUser(user, done) {
    	done(null, user);
	}

	function deserializeUser(user, done) {
	    userModel
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

	function loggedin(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	}

	function logout(req, res) {
		req.logOut();
    	res.send(200);
	}

	function register(req, res) {
		userModel
			.createUser(req.body)
			.then(
	            function(user){
	                req.login(user, function(err, user) {
	                	if(err) {
	                		console.log(err);
	                		res.sendStatus(400).send(err);
	                	} else {
	                		console.log(user);
	                		res.json(user);	                		
	                	}
	                });
	            },
	            function(err){
	                res.sendStatus(400).send(err);
	            }
	        );
	}

	function isAdmin(req, res) {
		res.send(req.isAuthenticated() && req.user.role == 'ADMIN' ? req.user : '0');
	}

	function passportFindAllUsers(req, res) {
		if(req.user && req.user.role=='ADMIN') {
			userModel
				.findAllUsers()
				.then(
		            function(users){
		                res.json(users); 
		            },
		            function(err){
		                res.sendStatus(400).send(err);
		            }
		        );
		} else {
			res.send(401);
		}
	}

	function deleteUser(req, res) {
		var userId = req.params.userId;

		if(req.user && req.user.role=='ADMIN') {
			userModel
				.deleteUser(userId)
				.then(
		            function(status){
		                res.json(status); 
		            },
		            function(err){
		                res.sendStatus(400).send(err);
		            }
		        );
		} else {
			res.send(401);
		}
	}

}