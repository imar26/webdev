(function() {
	angular
		.module("ValidationApp", [])
		.controller("ValidationController", ValidationController);

	function ValidationController() {
		console.log("ValidationController");
	}
})();