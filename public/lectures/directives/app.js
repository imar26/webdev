(function() {
	angular
		.module("DirectivesApp", [])
		.directive('helloWorld', helloWorldDirective)
		.directive('colorMeRed', colorMeRedDirective)
		.directive('makeMeDraggable', makeMeDraggableDirective)
		.directive('makeMeSortable', makeMeSortableDirective)
		.directive('hello', helloDirective);

	function helloDirective() {
		var config = {
			template: '<h2>Hello From Hello Directive</h2>'
		};
		return config;
	}	
	function helloWorldDirective() {
		var config = {
			templateUrl: 'helloWorld.html'
		};
		return config;
	}
	function colorMeRedDirective() {
		function linkFunc(scope, element) {
			console.log(element);
			element.css('color', 'red');
		}
		return {
			link: linkFunc
		};
	}	
	function makeMeDraggableDirective() {
		function linkFunc(scope, element) {
			element.draggable();
		}
		return {
			link: linkFunc
		};
	}
	function makeMeSortableDirective() {
		function linkFunc(scope, element) {
			element.sortable({
				axis: "y"
			});
		}
		return {
			link: linkFunc
		};
	}
})();