(function() {
	angular
		.module("WebAppMaker")
		.directive("wbdvSortable", SortableDirective);

	function SortableDirective() {
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