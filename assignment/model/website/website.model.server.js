module.exports = function() {
	var model = {};
	var mongoose = require('mongoose');
	var WebsiteSchema = require('./website.schema.server.js')();
	var UserSchema = require('../user/user.schema.server.js')();
	var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);
	var UserRepeatModel = mongoose.model('UserRepeatModel', UserSchema);
	var q = require('q');

	var api = {
		setModel: setModel,
		findWebsitesByUser: findWebsitesByUser,
		createWebsite: createWebsite,
		findWebsiteById: findWebsiteById,
		updateWebsite: updateWebsite,
		deleteWebsite: deleteWebsite
	};
	return api;

	function setModel(_model) {
		model = _model;
	}

	function findWebsitesByUser(userId) {
		var deferred = q.defer();
		WebsiteModel
			.find({"_user" : userId}, function(err, websites) {
				if(err) {
					deferred.abort(err);
				} else {
					deferred.resolve(websites);
				}
			});
		return deferred.promise;
	}

	function createWebsite(userId, website) {
		var deferred = q.defer();
		WebsiteModel
			.create(website, function(err, website) {
				if(err) {
					deferred.abort(err);
				} else {
					UserRepeatModel
						.update({"_id" : userId}, {$push : {
							"websites" : website._id
						}}, function(err, website) {
							if(err) {
								deferred.abort(err);
							} else {
								deferred.resolve(website);
							}
						});

					WebsiteModel
						.update({"_id" : website._id}, {$set : {
							"_user" : userId
						}}, function(err, website) {
							if(err) {
								deferred.abort(err);
							} else {
								deferred.resolve(website);
							}
						});						
				}
			});
		return deferred.promise;
	}

	function findWebsiteById(websiteId) {
		var deferred = q.defer();
		WebsiteModel
			.findOne({"_id" : websiteId}, function(err, website) {
				if(err) {
					deferred.abort(err);
				} else {
					deferred.resolve(website);
				}
			});
		return deferred.promise;
	}

	function updateWebsite(websiteId, website) {
		var deferred = q.defer();
		WebsiteModel
			.update({"_id" : websiteId}, {$set : {
				name: website.name,
				description: website.description
			}}, function(err, website) {
				if(err) {
					deferred.abort(err);
				} else {
					deferred.resolve(website);
				}
			});
		return deferred.promise;
	}

	function deleteWebsite(websiteId, userId) {
		var deferred = q.defer();
		WebsiteModel
			.remove({"_id" : websiteId}, function(err, website) {
				if(err) {
					deferred.abort(err);
				} else {
					UserRepeatModel
						.update({"_id" : userId}, {$pull : {
							"websites" : websiteId
						}}, function(err, website) {
							if(err) {
								deferred.abort(err);
							} else {
								deferred.resolve(website);
							}
						});
				}
			});
		return deferred.promise;
	}
};