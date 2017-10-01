module.exports = function(app) {

	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	passport.use(new LocalStrategy(localStrategy));

	var userModel = require('../models/user.model.server.js');

	passport.serializeUser(serializeUser);
	passport.deserializeUser(deserializeUser);

	app.post('/api/passportlogin', passport.authenticate('local'), login);
	app.post('/api/loggedin', loggedin);

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

}