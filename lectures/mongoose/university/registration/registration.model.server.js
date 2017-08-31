var mongoose = require('mongoose');

var RegistrationSchema = require('./registration.schema.server.js');

var q = require('q');

var RegistrationModel = mongoose.model('RegistrationModel', RegistrationSchema);

function registerStudentInCourse(studentId, courseId) {
	var d = q.defer();
	var registration = {
		student: studentId,
		course: courseId
	};

	RegistrationModel
		.create(registration, function(err, doc) {
			d.resolve(doc);
		});
		return d.promise;
}

function findAllRegistrations() {
	var d = q.defer();
	RegistrationModel
		.find()
		.populate('student', 'username -_id')
		.populate('course', 'name -_id')
		.exec(function(err, registrations) {
			d.resolve(registrations);
		});
		return d.promise;
}

RegistrationModel.registerStudentInCourse = registerStudentInCourse;
RegistrationModel.findAllRegistrations = findAllRegistrations;

module.exports = RegistrationModel;