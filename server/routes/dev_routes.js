var fs = require('fs');
var _ = require('underscore');
var util = require('util');
var multiparty = require('multiparty');











exports.addBuckleForm = function(req, res){
	fs.readFile(root_dir + '/views/admin.template', 'utf8', function(err, templateContent) {
		if(err) throw err;
		var renderedOutput = _.template(templateContent, {});
		res.send(renderedOutput);
	});
};

exports.addBuckle = function(request, response) {
	console.log("Got an admin request");
	
	var form = new multiparty.Form();

    form.parse(request, function(err, fields, files) {
		
		var name = fields.name || 'no name was sent';
		var notes = fields.notes;
		var date_acquired = fields.dateAcquired || new Date();
		var buckleImage = files.image;
		
		console.log(util.inspect(buckleImage));
		
		var imagePath = root_dir + '/upload/' + buckleImage.originalFilename;
		var thumbnailPath = root_dir + '/upload/thumbnails/' + buckleImage.originalFilename;
		
		fs.writeFile(imagePath, imageData, 'binary', function(err, written, buffer){
			if(err) throw err;
			imageUtils.createThumbnail(imagePath, thumbnailPath, function(err, resizedImageData){
				console.log(buckleImage.name + ' has been resized');
				
				var queriesAndParams = [];
				queriesAndParams.push({
					query : "INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES($1, $2, $3);", 
					params : [name, notes, date_acquired]
				});
				queriesAndParams.push({
					query : "INSERT INTO buckle_image(buckle_id, filename) VALUES(CURRVAL('buckle_id_seq'), $1);", 
					params : [buckleImage.name]
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
    });
};












//module.exports = function(app, db){
	/*
	app.get('/admin', function(request, response)
	{
		var templateContent = fs.readFileSync(root_dir + '/views/admin.template', 'utf8');
		var renderedOutput = _.template(templateContent, {});
		response.send(renderedOutput);
	});
	* */

/*
	app.get('/batchImport', function(request, response)
	{
		var images = fs.readdirSync(root_dir + '/upload');
		
		images.forEach(function(buckleImage) {
			fs.readFile(root_dir + '/upload/' + buckleImage, function (err, imageData) {
				im.resize({
					srcData: imageData,
					width:   150
				}, function(err, stdout, stderr){
					if(err) throw err;
					console.log('Resized : ' + buckleImage);
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
	* */
	/*
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
	*/
//};
