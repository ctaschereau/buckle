var fs = require('fs');
var _ = require('underscore');
var im = require('imagemagick');
var mime = require('mime');

module.exports = function(app, db){

	app.get('/', function(request, response)
	{
		var title = 'Buckles V0.8';
		var subtitle = 'Now async and with PG database ! <a href="/execs/BuckleUploader.apk">Android app V0.1</a>';
		
		db.getBucklesData(function(items) {
			fs.readFile(root_dir + '/views/index.template', 'utf8', function(err, templateContent) {
				if(err) throw err;
				var renderedOutput = _.template(templateContent, { title: title, subtitle: subtitle, items:items });
				response.send(renderedOutput);
			});
		});
	});

	app.get('/getImage/:image_id/:is_thumbnail/:image_name', function(request, response)
	{
		var image_id = request.params.image_id;
		var is_thumbnail = request.params.is_thumbnail;
		var image_name = request.params.image_name;
		
		fs.readFile(root_dir + '/upload/' + image_name, function (err, data) {
			if(err)
			{
				//console.log('Request for ' + (is_thumbnail == '1' ? 'thumbnail ' : 'image ') + image_name + ' threw error : ' + err.message);
				fs.readFile(root_dir + '/public/images/noImage.jpg', function (err, data) {
					if (err) throw err;
					response.writeHead(200, {"Content-Type": 'image/jpg'});
					response.write(data);
					response.end();
				});
			}
			else
			{
				//console.log('Going to serve request for ' + (is_thumbnail == '1' ? 'thumbnail ' : 'image ') + image_name);
				response.writeHead(200, {"Content-Type": 'image/jpeg'});
				response.write(data);
				response.end();
			}
		});
	});


	app.post('/addBuckle', function(request, response)
	{
		console.log("Got an admin request");
		
		var name = request.param('name', 'no name was sent');
		var notes = request.param('notes', '');
		var date_acquired = request.param('dateAcquired', new Date(2013,01,01));
		var buckleImage = request.files.image;
		
		try {
			fs.readFile(buckleImage.path, function (err, imageData) {
				im.resize({
					srcData: imageData,
					width:   150
				}, function(err, stdout, stderr){
					if(err) throw err;
					console.log(buckleImage.name + ' has been resized');
					var thumbnailData = new Buffer(stdout, 'binary');
					
					var queriesAndParams = [];
					queriesAndParams.push({
						query : "INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES($1, $2, $3);", 
						params : [name, notes, date_acquired]
					});
					queriesAndParams.push({
						query : "INSERT INTO buckle_image(buckle_id, filename, image, thumbnail, mimetype) VALUES(CURRVAL('buckle_id_seq'), $1, decode($2, \'hex\'), decode($3, \'hex\'), $4);", 
						params : [buckleImage.name, imageData.toString('hex'), thumbnailData.toString('hex'), mime.lookup(buckleImage.name)]
					});
					
					db.doInTransaction(queriesAndParams, function(err) {
						if(err) throw err;
						console.log('Saved a new buckle named : ' + name + ' in the database !');
						response.writeHead(302, {
							'Location': '/'
						});
						response.end();
					});
				});
			});
		} catch (err) {
			console.log('An error occured while resizing the new image or saving the new data to the database : ' + err);
			response.writeHead(302, {
				'Location': '/'
			});
			response.end();
		}
	});

};
