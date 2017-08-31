var mongoose = require('mongoose');

var StudentSchema = mongoose.Schema({
	course: {type : mongoose.Schema.Types.ObjectId, ref: 'CourseModel'},
	username: String
}, {collection: 'studentDB'});

module.exports = StudentSchema;