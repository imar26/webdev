module.exports = function() {
	var model = {};
	var mongoose = require('mongoose');
	var WebsiteSchema = require('./website.schema.server.js')();
	var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);
	var q = require('q');

	var api = {
		setModel: setModel,
		findWebsitesByUser: findWebsitesByUser
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
};