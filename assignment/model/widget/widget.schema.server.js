module.exports = function() {
	var mongoose = require('mongoose');

	var WidgetSchema = mongoose.Schema({
		_page: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'PageModel'
		},
		widgetType: {
			type: String,
			enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']
		},
		name: String,
		text: String,
		placeholder: String,
		description: String,
		url: String,
		path: String,
		width: String,
		height: String,
		rows: Number,
		size: Number,
		class: String,
		icon: String,
		deletable: Boolean,
		formatted: Boolean,
		index: Number,
		dateCreated: {
			type: Date,
			default: Date.now
		}
	}, {collection: 'WidgetDB'});

	return WidgetSchema;
};