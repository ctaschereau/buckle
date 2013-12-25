var fs = require('fs');
var im = require('imagemagick');
var async= require('async');
var log4js = require('log4js');
var logger = log4js.getLogger('imageUtils');

var defaultThumbnailWidth = 150;

var createThumbnailFromData = function(imageData, callback){
	im.resize({
		srcData: imageData,
		width:   defaultThumbnailWidth
	}, function(err, stdout, stderr){
		if(stderr) {
			logger.warn('Imagemagic stderr : ' + stderr);
		}
		callback(err, stdout);
	});
};
exports.createThumbnailFromData = createThumbnailFromData;

exports.createThumbnail = function(src, dst, mainCallback){
	async.waterfall([
		function(callback) {
			fs.readFile(src, callback);
		},
		function(imageData, callback) {
			createThumbnailFromData(imageData, callback);
		},
		function(resizedImageData, callback) {
			logger.info('Resized : ' + src);
			fs.writeFile(dst, resizedImageData, 'binary', callback);
		},
		function(callback) {
			fs.readFile(dst, callback);
		},
		function(data, callback) {
			callback(null, data);
		}
	],
	function (err, thumbnailData) {
		if(err) {
			logger.error('createThumbnail error ! ' + err.message);
			logger.error(err);
			mainCallback(err);
			return;
		}
		
		mainCallback(null, thumbnailData)
	});
};
