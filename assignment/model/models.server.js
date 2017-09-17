module.exports = function() {
	var mongoose = require('mongoose');

	var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
    if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
        var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds143132.mlab.com:43132/heroku_rq9kbjgg'; // user yours
    }

    mongoose.connect(connectionString);

    var userModel = require('./user/user.model.server.js')();
    var pageModel = require('./page/page.model.server.js')();
    var websiteModel = require('./website/website.model.server.js')();
    var widgetModel = require('./widget/widget.model.server.js')();

    var model = {
    	userModel: userModel,
    	pageModel: pageModel,
    	websiteModel: websiteModel,
    	widgetModel: widgetModel
    };

    userModel.setModel(model);
    pageModel.setModel(model);
    websiteModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};