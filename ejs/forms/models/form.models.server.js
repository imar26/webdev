module.exports = function() {
	var forms = require('./form.mock.server.json');

	var api = {
		findAllForms: findAllForms,
		createForm: createForm,
		deleteForm: deleteForm,
		findFormById: findFormById,
		updateForm: updateForm
	};
	return api;

	function findAllForms() {
		return forms;
	}

	function createForm(form) {
		form._id = new Date().getTime();
		forms.push(form);
	}

	function deleteForm(id) {
		for(f in forms) {
			if(forms[f]._id == id) {
				forms.splice(f, 1);
			}
		}
	}

	function findFormById(id) {
		for(f in forms) {
			if(forms[f]._id == id) {
				return forms[f];
			}
		}
	}

	function updateForm(form) {
		for(f in forms) {
			if(forms[f]._id == form._id) {
				forms[f] = form;
			}
		}
	}
};