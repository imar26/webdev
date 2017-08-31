var mongoose = require('mongoose');

var RegistrationSchema = mongoose.Schema({
	course: {type: mongoose.Schema.Types.ObjectId, ref: 'CourseModel'},
	student: {type: mongoose.Schema.Types.ObjectId, ref: 'StudentModel'}
}, {collection: 'RegistrationDB'});

module.exports = RegistrationSchema;