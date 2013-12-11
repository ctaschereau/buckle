var pg = require('pg');

exports.getBucklesData = function (callback)
{
	var items = [];
	
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if(err) throw err;
		var sqlQuery = 'SELECT buckle_name, notes, date_acquired, array_agg(filename) AS image_filenames, array_agg(buckle_image.id) AS buckle_image_ids ' + 
						'FROM buckle ' + 
						'JOIN buckle_image USING(buckle_id) ' + 
						'GROUP BY buckle_name, notes, date_acquired ' + 
						'ORDER BY date_acquired, buckle_name';
		console.log(sqlQuery);
		client.query(sqlQuery, function(err, result) {
			result.rows.forEach(function(item) {
				items.push(item);
			});
			return callback(items);
		});
	});
};

exports.doInTransaction = function(queriesAndParams, callback) {
	if(!queriesAndParams || queriesAndParams.length == 0) {
		return;
	}
	
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if(err) return callback(err);
		client.query('BEGIN;', function(err, result) {
			if(err) return callback(err);
			
			function executeQuery(i) {
				if(i < queriesAndParams.length) {
					client.query(queriesAndParams[i].query, queriesAndParams[i].params, function(err, result) {
						if(err) return callback(err);
						executeQuery(i + 1);
					});
				} else {
					client.query('COMMIT;', function(err, result) {
						if(err) return callback(err);
						return callback(undefined);
					});
				}
			}
			executeQuery(0);
		});
	});
};

exports.executeSimpleQuery = function(query, params, callback) {
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if(err) { console.log('Error while getting a connection, problem was : ' + err); throw err; }
		client.query(query, params, function(err, result) {
			if(err) { console.log('Error while executing query : ' + query + ' with params : ' + params + "\nProblem was : " + err); throw err; }
			return callback();
		});
	});
};

exports.getTodos = function(callback) {
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if(err) throw err;
		var sqlQuery = 'SELECT * FROM todo ORDER BY description;';
		client.query(sqlQuery, function(err, result) {
			if(err) throw err;
			return callback(result.rows);
		});
	});
};
