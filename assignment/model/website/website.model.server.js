module.exports = function() {
	var model = {};
	var mongoose = require('mongoose');
	var WebsiteSchema = require('./website.schema.server.js')();
	var UserSchema = require('../user/user.schema.server.js')();
	var PageSchema = require('../page/page.schema.server.js')();
	var WidgetSchema = require('../widget/widget.schema.server.js')();
	var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);
	var UserRepeatModel = mongoose.model('UserRepeatModel', UserSchema);
	var RemovePageRepeatModel = mongoose.model('RemovePageRepeatModel', PageSchema);
	var RemoveWidgetRepeatModel = mongoose.model('RemoveWidgetRepeatModel', WidgetSchema);
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
			.find({"_id" : websiteId}, function(err, website) {
				if(err) {
					deferred.abort(err);
				} else {
					if(website.length > 0) {
						var pages = website[0].pages;
						var pagesLength = pages.length;
						if(pagesLength > 0) {
							for(var i=0; i<pagesLength;i++) {
								console.log("pages[i]");
								console.log(pages[i]);
								RemovePageRepeatModel
									.find({"_id" : pages[i]}, function(err, page) {
										if(err) {
											deferred.abort(err);
										} else {
											console.log("page");
											console.log(page);
											if(page.length > 0) {
												var widgets = page[0].widgets;
												var widgetsLength = widgets.length;
												console.log(widgets);
												console.log(widgetsLength);
												if(widgetsLength > 0) {
													for(var j=0;j<widgetsLength;j++) {
														RemoveWidgetRepeatModel
															.remove({"_id" : widgets[j]}, function(err, widget) {
																if(err) {
																	deferred.abort(err);
																} else {
																	deferred.resolve(widget);
																}
															});
													}
												}
											} else {
												deferred.resolve(page);
											}
										}
									});
							}

							setTimeout(function(){ 
								for(var i=0; i<pagesLength;i++) {
									console.log("2pages[i]");
									console.log(pages[i]);
									RemovePageRepeatModel
										.remove({"_id" : pages[i]}, function(err, removedpages) {
											if(err) {
												deferred.abort(err);
											} else {
												deferred.resolve(removedpages);
											}
										});
								} 
							}, 5000);
							
						} 

					} else {
						deferred.resolve(website);
					}

					WebsiteModel
						.remove({"_id" : websiteId}, function(err, deletedwebsite) {
							if(err) {
								deferred.abort(err);
							} else {
								UserRepeatModel
									.update({"_id" : userId}, {$pull : {
										"websites" : websiteId
									}}, function(err, user) {
										if(err) {
											deferred.abort(err);
										} else {
											deferred.resolve(user);
										}
									});
							}
						});
				}
			});
		return deferred.promise;
	}
};