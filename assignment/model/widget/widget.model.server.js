module.exports = function() {
	var mongoose = require('mongoose');
	var q = require('q');
	var model = {};
	var WidgetSchema = require('./widget.schema.server.js')();
	var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

	var api = {
		setModel: setModel,
		createWidget: createWidget,
		findWidgetsByPageId: findWidgetsByPageId,
		findWidgetById: findWidgetById,
		updateWidget: updateWidget
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
};