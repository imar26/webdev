(function() {
	angular
		.module("WebAppMaker")
		.directive("wbdvSortable", SortableDirective);

	function SortableDirective(WidgetService, $routeParams) {
		function linkFunc(scope, element) {
			var startIndex;
			var endIndex;
			var pageId = $routeParams['pid'];
			element.sortable({
				axis: "y",
				start: function(event, ui) {
					startIndex = ui.item.index();
				},
				stop: function(event, ui) {
					endIndex = ui.item.index();
					WidgetService
						.updateWidgetIndex(pageId, startIndex, endIndex)
						.then(function(response) {
							var success = "Reordering done.";
							console.log(response.data);
						}, function(response) {
							console.log(response);
						});
				}
			});
		}
		return {
			link: linkFunc
		};
	}
})();