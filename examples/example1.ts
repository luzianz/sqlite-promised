var Promise = require('promiz');
import sqlitep = require('../sqlite-promised');

interface IThing {
	id: number;
	name: string;
}

sqlitep.setPromiseGenerator(function(deferred) {
	return new Promise(deferred);
});

function displayRows(rows: IThing[]) {
	rows.forEach(function (row) {
		console.log('[%d]: %s', row.id, row.name);
	});
}

function onError(error) {
	console.error(error);
}

sqlitep.openDatabase('examples/data/sqlite.db').then(function (db) {
	var sql = 'SELECT * FROM things';
	return sqlitep.queryAndClose<IThing>(db, sql);
}).then(displayRows, onError);