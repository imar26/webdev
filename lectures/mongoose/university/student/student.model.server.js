var mongoose = require('mongoose');

var StudentSchema = require('./student.schema.server.js');

var StudentModel = mongoose.model('StudentModel', StudentSchema);

var q = require('q');

function createStudent(student) {
	var deferred = q.defer();
	StudentModel
		.create(student, function(err, course) {
			if(err) {
				deferred.abort(err);
 			} else {
 				deferred.resolve(course);
 			}
		});
		return deferred.promise;
}

function enrollStudentInCourse(studentId, courseId) {
	var deferred = q.defer();
	findStudentById(studentId)
		.then(function(student) {
			student.course = courseId;
			student.save(function(err, data) {
				deferred.resolve(data);
			});
		});
		return deferred.promise;
}

function findStudentById(studentId) {
	var deferred = q.defer();
	StudentModel.findById(studentId, function(err, student) {
		// if(err) {
		// 	deferred.abort(err);
		// } else {
			deferred.resolve(student);
		// }
	});
	return deferred.promise;
}

StudentModel.createStudent = createStudent;
StudentModel.enrollStudentInCourse = enrollStudentInCourse;

module.exports = StudentModel;