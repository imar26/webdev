// var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
var mongoose = require('mongoose');
// mongoose.connect(connectionString);

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	firstName: String
}, {collection: 'PassportUserDB'});
var userModel = mongoose.model('userModel', userSchema);

userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;

var q = require('q');
function createUser(user) {
	var d = q.defer();
	userModel
		.create(user, function(err, user) {
			if(err) {
				d.abort(err);
			} else {
				d.resolve(user);
			}
		});
	return d.promise;
}
function findUserByCredentials(username, password) {
	var d = q.defer();
	var query = {
		username: username,
		password: password
	};
	userModel
		.findOne(query, function(err, user) {
			if(err) {
				d.abort(err);
			} else {
				d.resolve(user);
			}
		});
	return d.promise;
}
function findUserById(userId) {
	var d = q.defer();
	userModel
		.findById(userId, function(err, user) {
			if(err) {
				d.abort(err);
			} else {
				d.resolve(user);
			}
		});
	return d.promise;
}

// createUser({
// 	username: 'admin',
// 	password: 'admin',
// 	firstName: 'Admin'
// });
// createUser({
// 	username: 'alice',
// 	password: 'alice',
// 	firstName: 'Alice'
// });
// createUser({
// 	username: 'bob',
// 	password: 'bob',
// 	firstName: 'Bob'
// });

module.exports = userModel;