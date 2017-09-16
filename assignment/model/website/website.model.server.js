module.exports = function() {
	var model = {};
	var mongoose = require('mongoose');
	var WebsiteSchema = require('./website.schema.server.js')();
	var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);
	var q = require('q');

	var api = {
		setModel: setModel,
		findWebsitesByUser: findWebsitesByUser,
		createWebsite: createWebsite
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
};