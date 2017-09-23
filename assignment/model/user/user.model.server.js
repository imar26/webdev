module.exports = function() {
	var model = {};
	var mongoose = require('mongoose');
	var UserSchema = require('./user.schema.server.js')();
	var WebsiteSchema = require('../website/website.schema.server.js')();
	var PageSchema = require('../page/page.schema.server.js')();
	var WidgetSchema = require('../widget/widget.schema.server.js')();
	var UserModel = mongoose.model('UserModel', UserSchema);
	var WebsiteModel1 = mongoose.model('WebsiteModel1', WebsiteSchema);
	var PageModel1 = mongoose.model('PageModel1', PageSchema);
	var WidgetModel1 = mongoose.model('WidgetModel1', WidgetSchema);
	var q = require('q');

	var api = {
		setModel: setModel,
		findUserByUsername: findUserByUsername,
		createUser: createUser,
		findUserByCredentials: findUserByCredentials,
		findUserById: findUserById,
		updateUser: updateUser,
		deleteUser: deleteUser
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

	function deleteUser(userId) {
		var deferred = q.defer();
		UserModel
			.find({"_id" : userId}, function(err, user) {
				if(err) {
					deferred.abort(err);
				} else {
					WebsiteModel1
						.find({"_user" : userId}, function(err, websites) {
							if(err) {
								deferred.abort(err);
							} else {
								var websitesLength = websites.length;
								for(var i=0; i<websitesLength; i++) {
									var pages = websites[i].pages;
									console.log(pages);
									if(pages) {
										var pagesLength = pages.length;
										for(var j=0; j<pagesLength; j++) {
											var pageId = pages[j];
											console.log(pageId);
											PageModel1
												.find({"_id" : pages[j]}, function(err, pages) {
													if(err) {
														deferred.abort(err);
													} else {
														var widgets = pages[0].widgets;
														console.log(widgets);
														if(widgets) {
															var widgetsLength = widgets.length;
															for(var k=0; k<widgetsLength; k++) {
																WidgetModel1
																	.remove({"_id" : widgets[k]}, function(err, widgets) {
																		if(err) {
																			deferred.abort(err);
																		} else {
																			deferred.resolve(widgets);
																		}
																	});
															}
														}
													}							
												});

											PageModel1
												.remove({"_id" : pageId}, function(err, pages) {
													if(err) {
														deferred.abort(err);
													} else {
														deferred.resolve(pages);
													}
												});									
										}
									}
								}
							}
						});	

					WebsiteModel1
						.remove({"_user" : userId}, function(err, websites) {
							if(err) {
								deferred.abort(err);
							} else {
								UserModel
									.remove({"_id" : userId}, function(err, user) {
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