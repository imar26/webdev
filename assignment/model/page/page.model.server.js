module.exports = function() {
	var model={};
	var mongoose = require('mongoose');
	var PageSchema = require('./page.schema.server.js')();
	var WebsiteSchema = require('../website/website.schema.server.js')();
	var PageModel = mongoose.model('PageModel', PageSchema);
	var WebsiteRepeatModel = mongoose.model('WebsiteRepeatModel', WebsiteSchema);
	var q = require('q');

	var api = {
		setModel: setModel,
		createPage: createPage,
		findPageByWebsiteId: findPageByWebsiteId,
		findPageById: findPageById,
		updatePage: updatePage,
		deletePage: deletePage
	};
	return api;

	function setModel(_model) {
		model = _model;
	}

	function createPage(websiteId, page) {
		var deferred = q.defer();
		PageModel
			.create(page, function(err, page) {
				if(err) {
					deferred.abort(err);
				} else {
					PageModel
						.update({"_id" : page._id}, {$set : {
							"_website" : websiteId
						}}, function(err, page) {
							if(err) {
								deferred.abort(err);
							} else {
								deferred.resolve(page);
							}
						});

					WebsiteRepeatModel
						.update({"_id" : websiteId}, {$push: {
							"pages" : page._id
						}}, function(err, page) {
							if(err) {
								deferred.abort(err);
							} else {
								deferred.resolve(page);
							}
						});
				}
			});
		return deferred.promise;
	}

	function findPageByWebsiteId(websiteId) {
		var deferred = q.defer();
		PageModel
			.find({"_website" : websiteId}, function(err, page) {
				if(err) {
					deferred.abort(err);
				} else {
					deferred.resolve(page);
				}
			});
		return deferred.promise;
	}

	function findPageById(pageId) {
		var deferred = q.defer();
		PageModel
			.findOne({"_id" : pageId}, function(err, page) {
				if(err) {
					deferred.abort(err);
				} else {
					deferred.resolve(page);
				}
			});
		return deferred.promise;
	}

	function updatePage(pageId, page) {
		var deferred = q.defer();
		PageModel
			.update({"_id" : pageId}, {$set : {
				name: page.name,
				description: page.description
			}}, function(err, page) {
				if(err) {
					deferred.abort(err);
				} else {
					deferred.resolve(page);
				}
			});
		return deferred.promise;
	}

	function deletePage(pageId, websiteId) {
		var deferred = q.defer();
		PageModel
			.remove({"_id" : pageId}, function(err, page) {
				if(err) {
					deferred.abort(err);
				} else {
					WebsiteRepeatModel
						.update({"_id" : websiteId}, {$pull : {
							"pages": pageId
						}}, function(err, page) {
							if(err) {
								deferred.abort(err);
							} else {
								deferred.resolve(page);
							}
						});
				}
			});
		return deferred.promise;
	}
};