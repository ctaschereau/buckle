var fs = require('fs');
var _ = require('underscore');
var imageUtils = require('../imageUtils');
var path = require('path');
var db = require('../db/db');
var util = require('util');
var Busboy = require('busboy');
var async= require('async');
var log4js = require('log4js');
var logger = log4js.getLogger('dev_routes');










exports.addBuckleForm = function(req, res){
	fs.readFile(root_dir + '/views/admin.template', 'utf8', function(err, templateContent) {
		if(err) throw err;
		var renderedOutput = _.template(templateContent, {});
		res.send(renderedOutput);
	});
};

exports.addBuckle = function(request, response) {
	logger.debug("Got an admin request");
	
	var newBuckleInfo = {};
	var imagePath, thumbnailPath;
	//var form = new multiparty.Form();

	async.waterfall([
		function(callback) {
			//form.parse(request, callback);
			
			var infiles = 0, outfiles = 0, done = false,
				busboy = new Busboy({ headers: request.headers });
			
			logger.debug('Start parsing form ...');
			
			 busboy.on('field', function(fieldname, val, valTruncated, keyTruncated) {
				logger.debug('Field [' + fieldname + ']: value: ' + JSON.stringify(val));
				newBuckleInfo[fieldname] = val;
			});
			
			// Form can only submit one image for now. Adjust later for more images
			busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
				newBuckleInfo.buckleImageName = filename;
				++infiles;
				onFile(file, filename, function() {
					++outfiles;
					if (done)
						logger.debug(outfiles + '/' + infiles + ' parts written to disk');
					if (done && infiles === outfiles) {
						// ACTUAL EXIT CONDITION
						logger.debug('All parts written to disk');
						callback();
					}
				});
			});
			busboy.on('end', function() {
				logger.debug('Done parsing form!');
				done = true;
			});
			request.pipe(busboy);
			
			
		},
		function(callback) {
			// set default values
			newBuckleInfo.name = newBuckleInfo.name || 'no name was sent';
			newBuckleInfo.date_acquired = newBuckleInfo.dateAcquired || new Date();
			
			imagePath = root_dir + '/upload/' + newBuckleInfo.buckleImageName;
			thumbnailPath = root_dir + '/upload/thumbnails/' + newBuckleInfo.buckleImageName;
			imageUtils.createThumbnail(imagePath, thumbnailPath, callback);
		},
		function(resizedImageData, callback) {
			logger.debug(newBuckleInfo.buckleImageName + ' has been thumbnailed');
			
			var queriesAndParams = [];
			queriesAndParams.push({
				query : "INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES($1, $2, $3);", 
				params : [newBuckleInfo.name, newBuckleInfo.notes, newBuckleInfo.date_acquired]
			});
			queriesAndParams.push({
				query : "INSERT INTO buckle_image(buckle_id, filename) VALUES(CURRVAL('buckle_buckle_id_seq'), $1);", 
				params : [newBuckleInfo.buckleImageName]
			});
				
			db.doInTransaction(queriesAndParams, callback);
		},
		function(callback) {
			logger.info('Saved a new buckle named : ' + newBuckleInfo.buckleImageName + ' in the database !');
			response.writeHead(302, {
				'Location': '/'
			});
			response.end();
			callback(null);
		}
	],
	function (err) {
		if(err) {
			logger.error('addBuckle error ! ' + err.message);
			logger.error(err);
			return;
		}
	});
};




function onFile(file, filename, next) {
	var fstream = fs.createWriteStream(path.join(root_dir + '/upload/', path.basename(filename)));
		file.on('end', function() {
		logger.debug(filename + ' EOF');
	});
	fstream.on('close', function() {
		logger.debug(filename + ' written to disk');
		next();
	});
	logger.debug(filename + ' start saving ...');
	file.pipe(fstream);
}
