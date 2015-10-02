var sqlite_promised = require('../js/sqlite-promised');

var observer = {
	next: function(value) {
		console.log(value.content);
	}, error: function(error) {
		console.error(error);
	}, done: function() {
	}
}

sqlite_promised.openDatabase('database.db').then(function (db) {
	return sqlite_promised.observeQueryAndClose(db, 'select * from "main"."vw_notes"', observer);
}, function (err) {
	console.error(err);
});
