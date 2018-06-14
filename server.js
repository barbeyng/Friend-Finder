var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use('/style', express.static('style'));

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

require(path.join(__dirname, '/app/routing/apiRoutes.js'))(app);
require(path.join(__dirname, '/app/routing/htmlRoutes.js'))(app);

app.listen(PORT, function() {
    console.log('Now listening on PORT: ' + PORT);
})