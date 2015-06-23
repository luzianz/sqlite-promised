var sqlite_promised = require('sqlite-promised');

sqlite_promised.openDatabase('database.db').then(function (db) {
	return sqlite_promised.queryAndClose(db, 'select * from "main"."vw_notes"');
}).then(function (rows) {
	rows.forEach(function (row) {
		console.log(row.content);
	});
}, function (err) {
	console.error(err);
});
