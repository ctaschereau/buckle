var fs = require('fs');
var _ = require('underscore');
var im = require('imagemagick');
var mime = require('mime');

module.exports = function(app, db){
	
	app.get('/admin', function(request, response)
	{
		var templateContent = fs.readFileSync(root_dir + '/views/admin.template', 'utf8');
		var renderedOutput = _.template(templateContent, {});
		response.send(renderedOutput);
	});

	app.get('/batchImport', function(request, response)
	{
		var images = fs.readdirSync(root_dir + '/public/images/buckles');
		
		images.forEach(function(buckleImage) {
			fs.readFile(root_dir + '/public/images/buckles/' + buckleImage, function (err, imageData) {
				im.resize({
					srcData: imageData,
					width:   150
				}, function(err, stdout, stderr){
					if(err) throw err;
					console.log('Resized : ' + buckleImage);
					var thumbnailData = new Buffer(stdout, 'binary');
					var query = 'UPDATE buckle_image SET image=decode($1, \'hex\'), thumbnail=decode($2, \'hex\'), mimetype=$3 WHERE filename = $4';
					var params = [imageData.toString('hex'), thumbnailData.toString('hex'), mime.lookup(buckleImage), buckleImage];
					//console.log('Going to execute query : ' + query + ' with params : ' + params[2] + ', ' + params[3] +' ...');
					db.executeSimpleQuery(query, params, function() {
						console.log('Updated image ' + buckleImage + ' successfully !');
					});
				});
			});
		});
		
		response.writeHead(302, {
			'Location': '/'
		});
		response.end();
	});
	
	app.get('/todo', function(request, response)
	{
		db.getTodos(function(resultRows) {
			if(resultRows.length == 0)
			{
				response.send('Nothing to do :)');
			}
			else
			{
				resultRows.forEach(function(thingTodo) {
					response.write(thingTodo['description'] + "\n");
				});
				response.end();
			}
		});
	});
};
