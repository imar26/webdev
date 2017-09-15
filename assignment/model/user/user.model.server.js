module.exports = function() {
	var model = {};
	var mongoose = require('mongoose');
	var UserSchema = require('./user.schema.server.js')();
	var UserModel = mongoose.model('UserModel', UserSchema);
	var q = require('q');

	var api = {
		setModel: setModel
	};
	return api;

	function setModel(_model) {
		model = _model;
	}
};