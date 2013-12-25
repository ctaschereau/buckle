module.exports = GLOBAL.root_dir = __dirname;

var express = require('express');
var routes = require('./server/routes');
var dev_routes = require('./server/routes/dev_routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.index);
app.get('/getImage/:image_id/:is_thumbnail/:image_name', routes.getImage);
app.get('/addBuckle', dev_routes.addBuckleForm);
app.post('/addBuckle', dev_routes.addBuckle);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
