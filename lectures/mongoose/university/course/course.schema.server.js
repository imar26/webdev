var mongoose = require('mongoose');

var CourseSchema = mongoose.Schema({
	name: String,
	students: [{type: mongoose.Schema.Types.ObjectId, ref: 'StudentModel'}]
}, {collection: 'courseDB'});

module.exports = CourseSchema;