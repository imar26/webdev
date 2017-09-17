module.exports = function() {
	var mongoose = require('mongoose');
	var q = require('q');
	var model = {};
	var WidgetSchema = require('./widget.schema.server.js')();
	var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

	var api = {
		setModel: setModel
	};
	return api;

	function setModel(_model) {
		model = _model;
	}
};