var mongoose = require('mongoose');

var CourseSchema = require('./course.schema.server.js');

var CourseModel = mongoose.model('CourseModel', CourseSchema);

var q = require('q');

function registerStudentInCourse(studentId, courseId) {
	var deferred = q.defer();
	findCourseById(courseId)
		.then(function(course) {
			course.students.push(studentId);
			course.save(function(err, data) {
				deferred.resolve(data);
			});
		});
		return deferred.promise;
}

function findCourseById(courseId) {
	var deferred = q.defer();
	CourseModel.findById(courseId, function(err, course) {
		if(err) {
			deferred.abort(err);
		} else {
			deferred.resolve(course);
		}
	});
	return deferred.promise;
}

function createCourse(course) {
	CourseModel
		.create(course);
}

function findAllCourses() {
	var deffered = q.defer();
	CourseModel
		.find(function(err, courses) {
			if(err) {
				deffered.abort(err);
			} else {
				deffered.resolve(courses);
			}
		});
		return deffered.promise;
}

CourseModel.createCourse = createCourse;
CourseModel.findAllCourses = findAllCourses;
CourseModel.findCourseById = findCourseById;
CourseModel.registerStudentInCourse = registerStudentInCourse;

module.exports = CourseModel;