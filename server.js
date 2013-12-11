var express = require('express');

var app = express();

module.exports = GLOBAL.root_dir = __dirname

require('./server/config/config.js')(app, express);
var db = require('./server/db/db.js');
require('./server/routes/routes.js')(app, db);
require('./server/routes/dev_routes.js')(app, db);

exports.app = app;

var port = process.env.PORT || 3000;
app.listen(port, function()
{
	console.log("Listening on " + port);
});
