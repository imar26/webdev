(function() {
	angular
		.module("PortalApp", ["ui.router"])
		.config(configuration)
		.service("courseService", courseService);

	function configuration($stateProvider, $urlRouterProvider) {
		var course = {
			name: 'course',
			url: '/course',
			views: {
				root: {
					templateUrl: 'views/templates/course-list.html',
					controller: function($scope, courseService) {
						$scope.courses = courseService.findAllCourses();
					}
				}
			}
		};

		var courseDetails = {
			name: 'course.details',
			url: '/:courseId',
			views: {
				courseDetails: {
					templateUrl: 'views/templates/course-details.html',
					controller: function($scope, courseService, $stateParams) {
						$scope.courseId = $stateParams.courseId;
						$scope.course = courseService.findCourseById($scope.courseId);
					}
				}
			}
		};

		var courseNew = {
			name: 'course.new',
			url: '/new',
			views: {
				courseDetails: {
					templateUrl: 'views/templates/course-new.html',
					controller: function($scope, courseService, $stateParams) {
						$scope.courseId = $stateParams.courseId;
						$scope.course = courseService.findCourseById($scope.courseId);
					}
				}
			}
		};

		$stateProvider.state(course);
		$stateProvider.state(courseDetails);
		$stateProvider.state(courseNew);

		$urlRouterProvider.otherwise('/course');
	}

	function courseService() {
		this.findAllCourses = findAllCourses;
		this.findCourseById = findCourseById;

		var courses = [
			{_id: '123', name: 'CS5610', overview: 'Lorem ipsum'},
			{_id: '234', name: 'CS6610', overview: 'Lorem ipsum'},
			{_id: '345', name: 'CS7610', overview: 'Lorem ipsum'}
		];

		function findAllCourses() {
			return courses;
		}

		function findCourseById(courseId) {
			for(var i=0; i<courses.length;i++) {
				if(courses[i]._id == courseId) {
					return courses[i];
				}
			}
		}
	}
})();