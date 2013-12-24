var fs = require('fs');
var im = require('imagemagick');

var defaultThumbnailWidth = 150;

var createThumbnailFromData = function(imageData, callback){
	im.resize({
		srcData: imageData,
		width:   defaultThumbnailWidth
	}, function(err, stdout, stderr){
		callback(err, stdout);
	});
};
exports.createThumbnailFromData = createThumbnailFromData;

exports.createThumbnail = function(src, dst, callback){
	fs.readFile(src, function(err, imageData){
		createThumbnailFromData(imageData, function(err, resizedImageData) {
			console.log('Resized : ' + src);
			fs.writeFile(dst, resizedImageData, 'binary', function(err, written, buffer){
				if(err) throw err;
				fs.readFile(dst, function(err, data){
					if(err) throw err;
					callback(null, data);
				});
			});
		});
	});
};
