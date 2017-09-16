module.exports = function() {
	var model = {};
	var mongoose = require('mongoose');
	var UserSchema = require('./user.schema.server.js')();
	var UserModel = mongoose.model('UserModel', UserSchema);
	var q = require('q');

	var api = {
		setModel: setModel,
		findUserByUsername: findUserByUsername,
		createUser: createUser,
		findUserByCredentials: findUserByCredentials,
		findUserById: findUserById,
		updateUser: updateUser
	};
	return api;

	function setModel(_model) {
		model = _model;
	}

	function findUserByUsername(username) {
		var deferred = q.defer();
		UserModel
			.findOne({"username" : username}, function(err, user) {
				if(err) {
					deferred.abort(err);
				} else {
					deferred.resolve(user);
				}
			});
		return deferred.promise;
	}

	function createUser(user) {
		var deferred = q.defer();
		UserModel
			.create(user, function(err, user) {
				if(err) {
					deferred.abort(err);
				} else {
					deferred.resolve(user);
				}
			});
		return deferred.promise;
	}

	function findUserByCredentials(username) {
		var deferred = q.defer();
		UserModel
			.findOne({"username" : username}, function(err, user) {
				if(err) {
					deferred.abort(err);
				} else {
					deferred.resolve(user);
				}
			});
		return deferred.promise;
	}

	function findUserById(userId) {
		var deferred = q.defer();
		UserModel
			.findOne({"_id" : userId}, function(err, user) {
				if(err) {
					deferred.abort(err);
				} else {
					deferred.resolve(user);
				}
			});
		return deferred.promise;
	}

	function updateUser(userId, user) {
		var deferred = q.defer();
		UserModel
			.update({"_id" : userId}, {
				$set: {
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName
				}
			}, function(err, user) {
				if(err) {
					deferred.abort(err);
				} else {
					deferred.resolve(user);
				}
			});
		return deferred.promise;
	}
};