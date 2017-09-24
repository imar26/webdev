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
					if(user.length > 0) {
						var websites = user[0].websites;
						var websitesLength = websites.length;
						if(websitesLength > 0) {
							for(var i=0; i<websitesLength;i++) {
								console.log("websites[i]");
								console.log(websites[i]);
								WebsiteModel1
									.find({"_id" : websites[i]}, function(err, website) {
										if(err) {
											deferred.abort(err);
										} else {
											console.log("website");
											console.log(website);
											if(website.length > 0) {
												var pages = website[0].pages;
												var pagesLength = pages.length;
												console.log(pages);
												console.log(pagesLength);
												if(pagesLength > 0) {
													for(var j=0;j<pagesLength;j++) {
														console.log("pages[j]");
														console.log(pages[j]);
														PageModel1
															.find({"_id" : pages[j]}, function(err, page) {
																if(err) {
																	deferred.abort(err);
																} else {
																	console.log("page");
																	console.log(page);
																	if(page.length > 0) {
																		var widgets = page[0].widgets;
																		var widgetsLength = widgets.length;
																		if(widgetsLength > 0) {
																			for(var k=0;k<widgetsLength;k++) {
																				WidgetModel1
																					.remove({"_id" : widgets[k]}, function(err, widget) {
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
															PageModel1
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
										}
									});
							}

							setTimeout(function(){ 
								for(var i=0; i<websitesLength;i++) {
									console.log("websites[i]");
									console.log(websites[i]);
									WebsiteModel1
										.find({"_id" : websites[i]}, function(err, website) {
											if(err) {
												deferred.abort(err);
											} else {
												console.log("website");
												console.log(website);
												if(website.length > 0) {
													var pages = website[0].pages;
													var pagesLength = pages.length;
													console.log(pages);
													console.log(pagesLength);
													if(pagesLength > 0) {
														for(var j=0;j<pagesLength;j++) {
															console.log("pages[j]");
															console.log(pages[j]);
															PageModel1
																.remove({"_id" : pages[j]}, function(err, page) {
																	if(err) {
																		deferred.abort(err);
																	} else {
																		deferred.resolve(page);
																	}
																});
														}
													}
												} else {
													deferred.resolve(website);
												}
											}
										});
								} 
							}, 8000);

							setTimeout(function(){ 
								for(var i=0; i<websitesLength;i++) {
									console.log("websites[i]");
									console.log(websites[i]);
									WebsiteModel1
										.remove({"_id" : websites[i]}, function(err, website) {
											if(err) {
												deferred.abort(err);
											} else {
												deferred.resolve(website);
											}
										});
								} 
							}, 12000);
							
						} 

					} else {
						deferred.resolve(user);
					}

					UserModel
						.remove({"_id" : userId}, function(err, deletedwebsite) {
							if(err) {
								deferred.abort(err);
							} else {
								deferred.resolve(user);
							}
						});
				}
			});
		return deferred.promise;
	}
};