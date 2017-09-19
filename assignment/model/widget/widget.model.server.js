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
		findWidgetById: findWidgetById
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
};