module.exports = function(app) {
	app.get("/ejs/form", renderAllForms);

	function renderAllForms(req, res) {
		var data = {
			forms: [
				{name: 'Form 1', _id: '123'},
				{name: 'Form 2', _id: '234'},
				{name: 'Form 3', _id: '345'},
				{name: 'Form 4', _id: '456'},
				{name: 'Form 5', _id: '567'}
			]
		};
		res.render("ejs/form/form-list.view.server.ejs", data);
	}
};