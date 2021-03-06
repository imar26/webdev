var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
    secret: 'this is the secret', // process.env.SESSION_SECRET
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require ("./test/app.js")(app);

require ("./todo/app")(app);
require ("./blog/app")(app);

require ("./assignment/app.js")(app);
// require ("./lectures/mongo/movies.js")(app);
require ("./lectures/mongo/movies/app.js")(app);
require ("./ejs/forms/app.js")(app);

require ("./lectures/mongoose/university/university.js");

// require ("./lectures/passportjs/services/user.service.server.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);