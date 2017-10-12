module.exports = function(app, model) {
	app.get("/ejs/form", renderAllForms);
	app.post("/ejs/form", postForm);
	app.get("/ejs/form/:formId/delete", deleteForm);
	app.get("/ejs/form/:formId", findFormById);
	app.get("/ejs/form/:formId/details", renderFormDetails);

	function renderAllForms(req, res) {
		var forms = model.findAllForms();
		var data = {
			forms: forms
		};
		res.render("ejs/form/form-list.view.server.ejs", data);
	}

	function postForm(req, res) {
		var form = req.body;
		var action = form.action;
		if(action=="create") {
			model.createForm(form);
		} else if(action=="update") {
			model.updateForm(form);
		}
		res.redirect("/ejs/form");
	}

	// function createForm(req, res) {
	// 	var form = req.body;
	// 	model.createForm(form);
	// 	res.redirect("/ejs/form");
	// }

	function deleteForm(req, res) {
		var id = req.params.formId;
		model.deleteForm(id);
		res.redirect("/ejs/form");
	}

	function findFormById(req, res) {
		var id = req.params.formId;
		var form = model.findFormById(id);
		var data = {
			form: form,
			forms: model.findAllForms()
		};
		res.render("ejs/form/form-list.view.server.ejs", data);
	}

	function renderFormDetails(req, res) {
		var form = model.findFormById(req.params.formId);
		var data = {
			form: form
		};
		res.render("ejs/form/form-details.view.server.ejs", data);
	}
};