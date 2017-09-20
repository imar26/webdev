module.exports = function() {
	var mongoose = require('mongoose');
	var q = require('q');
	var model = {};
	var WidgetSchema = require('./widget.schema.server.js')();
	var PageSchema = require('../page/page.schema.server.js')();
	var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
	var PageRepeatModel = mongoose.model('PageRepeatModel', PageSchema);

	var api = {
		setModel: setModel,
		createWidget: createWidget,
		findWidgetsByPageId: findWidgetsByPageId,
		findWidgetById: findWidgetById,
		updateWidget: updateWidget,
		deleteWidget: deleteWidget
	};
	return api;

	function setModel(_model) {
		model = _model;
	}

	function createWidget(pageId, widget) {
		var deferred = q.defer();
		WidgetModel
			.create(widget, function(err, widget) {
				if(err) {
					deferred.abort(err);
				} else {
					WidgetModel
						.update({"_id" : widget._id}, {$set: {
							"_page" : pageId
						}}, function(err, widget) {
							if(err) {
								deferred.abort(err);
							} else {
								deferred.resolve(widget);
							}
						});

					PageRepeatModel
						.update({"_id" : pageId}, {$push: {
							"widgets" : widget._id
						}}, function(err, widget) {
							if(err) {
								deferred.abort(err);
							} else {
								deferred.resolve(widget);
							}
						});
				}
			});
		return deferred.promise;
	}

	function findWidgetsByPageId(pageId) {
		var deferred = q.defer();
		WidgetModel
			.find({"_page" : pageId}, function(err, widgets) {
				if(err) {
					deferred.abort(err);
				} else {
					deferred.resolve(widgets);
				}
			});
		return deferred.promise;
	}

	function findWidgetById(widgetId) {
		var deferred = q.defer();
		WidgetModel
			.find({"_id" : widgetId}, function(err, widget) {
				if(err) {
					deferred.abort(err);
				} else {
					deferred.resolve(widget);
				}
			});
		return deferred.promise;
	}

	function updateWidget(widgetId, widget) {
		var deferred = q.defer();
		if(widget.widgetType == 'HEADING') {
			WidgetModel
				.update({"_id" : widgetId}, {$set: {
					text: widget.text,
	        		size: widget.size
				}}, function(err, widget) {
					if(err) {
						deferred.abort(err);
					} else {
						deferred.resolve(widget);
					}
				});
		} else if(widget.widgetType == 'HTML') {
			WidgetModel
				.update({"_id" : widgetId}, {$set: {
					text: widget.text
				}}, function(err, widget) {
					if(err) {
						deferred.abort(err);
					} else {
						deferred.resolve(widget);
					}
				});
		} else if(widget.widgetType == 'IMAGE') {
			WidgetModel
				.update({"_id" : widgetId}, {$set: {
					text: widget.text,
	        		width: widget.width,
	        		url: widget.url,
	                path: widget.path
				}}, function(err, widget) {
					if(err) {
						deferred.abort(err);
					} else {
						deferred.resolve(widget);
					}
				});
		} else if(widget.widgetType == 'YOUTUBE') {
			WidgetModel
				.update({"_id" : widgetId}, {$set: {
					text: widget.text,
	        		width: widget.width,
	        		url: widget.url
				}}, function(err, widget) {
					if(err) {
						deferred.abort(err);
					} else {
						deferred.resolve(widget);
					}
				});
		}
		
		return deferred.promise;
	}

	function deleteWidget(pageId, widgetId) {
		var deferred = q.defer();
		WidgetModel
			.findOne({"_id" : widgetId}, function(err, widget) {
				if(err) {
					deferred.abort(err);
				} else {
					WidgetModel
						.find({"_page" : pageId}, function(err, widgets) {
							if(err) {
								deferred.abort(err);
							} else {
								for(var i=widget.index; i < widgets.length-1 ; i++) {
									WidgetModel
										.update({"index" : i+1}, {$set : {
											"index" : i
										}}, function(err, widget) {
											if(err) {
												deferred.abort(err);
											} else {
												WidgetModel
													.remove({"_id" : widgetId}, function(err, widget) {
														if(err) {
															deferred.abort(err);
														} else {
															PageRepeatModel
																.update({"_id" : pageId}, {$pull : {
																	widgets: widgetId
																}}, function(err, widget) {
																	if(err) {
																		deferred.abort(err);
																	} else {
																		deferred.resolve(widget);
																	}
																});
														}
													});
											}
										});
								}
							}
						});
				}
			});
		return deferred.promise;
	}
};