var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

require ("./todo/app")(app);
require ("./blog/app")(app);

require ("./assignment/app.js")(app);
require ("./lectures/mongo/movies.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);