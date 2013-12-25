var fs = require('fs');
var _ = require('underscore');
var db = require('../db/db');
var imageUtils = require('../imageUtils');
var log4js = require('log4js');
var logger = log4js.getLogger('index');

/*
 * GET home page.
 */
exports.index = function(req, res){
	var title = 'Buckles V0.8';
	var subtitle = 'Now running off a Raspberry Pi !';
	//<a href="/execs/BuckleUploader.apk">Android app V0.1</a>'
	
	db.getBucklesData(function(items) {
		fs.readFile(root_dir + '/views/index.template', 'utf8', function(err, templateContent) {
			if(err) throw err;
			var renderedOutput = _.template(templateContent, { title: title, subtitle: subtitle, items:items });
			res.send(renderedOutput);
		});
	});
};

exports.getImage = function(req, res) {
	var image_id = req.params.image_id;
	var is_thumbnail = req.params.is_thumbnail == '1';
	var image_name = req.params.image_name;
	var imagePath = root_dir + '/upload/' + image_name;
	var thumbnailPath = root_dir + '/upload/thumbnails/' + image_name;
	
	var writeImageToResponse = function(err, imageData){
		if(err) {
			logger.error('getImage error ! ' + err.message);
			logger.error(err);
			res.writeHead(500);
			res.write(err.message);
			res.end();
			return;
		}
		res.writeHead(200, {"Content-Type": 'image/jpg'});
		res.write(imageData);
		res.end();
	};
	
	logger.debug('Going to serve request for ' + (is_thumbnail ? 'thumbnail ' : 'image ') + (is_thumbnail ? thumbnailPath : imagePath));
	
	fs.stat((is_thumbnail ? thumbnailPath : imagePath), function(err, stat) {
		// if the file does not exist
		if(err && err.code == 'ENOENT') {
			// if it is not a thumbnail, display empty image. Otherwise, create the thumbnail
			if(!is_thumbnail) {
				logger.debug('Image does not exist, going to display the default image instead ...');
				fs.readFile(root_dir + '/public/images/noImage.jpg', writeImageToResponse);
			} else {
				logger.debug('Thumbnail does not exist, going to create it ...');
				imageUtils.createThumbnail(imagePath, thumbnailPath, writeImageToResponse);
			}
		} else if(err) {
			writeImageToResponse(err);
		} else {
			// File exists, so read it and return it
			fs.readFile((is_thumbnail ? thumbnailPath : imagePath), writeImageToResponse);
		}
	});
};

