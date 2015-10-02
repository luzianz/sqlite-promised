/// <reference path="../typings/sqlite3/sqlite3.d.ts" />
/// <reference path="../node_modules/lz-tslib-interfaces/IPromise.d.ts" />
/// <reference path="../node_modules/lz-tslib-interfaces/IObserver.d.ts" />

import sqlite3 = require('sqlite3');
var Promise = require('promiz');

export function openDatabase(filePath: string): IPromise<sqlite3.Database> {
	return createPromise(function(resolve, reject) {
		var db = new sqlite3.Database(filePath, function(error) {
			if (error) {
				reject(error);
			} else {
				resolve(db);
			}
		});
	});
}

export function closeDatabase<T>(db: sqlite3.Database, pass?: T): IPromise<T> {
	return createPromise(function(resolve, reject) {
		db.close(function(error) {
			if (error) {
				reject(error);
			} else {
				resolve(pass);
			}
		});
	});
}

export function prepareStatement(db: sqlite3.Database, sql: string): IPromise<sqlite3.Statement> {
	return createPromise(function(resolve, reject) {
		var stmt = db.prepare(sql, function(error) {
			if (error) {
				reject(error);
			} else {
				resolve(stmt);
			}
		});
	});
}

export function finalizeStatement<T>(stmt: sqlite3.Statement, pass?: T): IPromise<T> {
	return createPromise(function(resolve, reject) {
		stmt.finalize(function(error) {
			if (error) {
				reject(error);
			} else {
				resolve(pass);
			}
		});
	});
}

export function runStatement(stmt: sqlite3.Statement, params?): IPromise<sqlite3.Statement> {
	return createPromise(function(resolve, reject) {
		stmt.run(params, function(error) {
			if (error) {
				reject(error);
			} else {
				resolve(stmt);
			}
		});
	});
}

export function queryStatement<T>(stmt: sqlite3.Statement, params?): IPromise<{statement: sqlite3.Statement, rows: T[]}> {
	return createPromise(function(resolve, reject) {
		stmt.all(params, function(error, rows: any[]) {
			if (error) {
				reject(error);
			} else {
				resolve({ rows: rows, statement: stmt });
			}
		});
	});
}

export function observeQueryStatement<T>(stmt: sqlite3.Statement, observer: IObserver<T>, params?): IPromise<sqlite3.Statement> {
	return createPromise(function(resolve, reject) {
		function onRow(error, row) {
			if (error) {
				observer.error(error);
				reject(error);
			} else {
				observer.next(row);
			}
		}
		
		function onComplete(error, count) {
			observer.done();
			if (error) {
				reject(error);
			} else {
				resolve(stmt);
			}
		}
		
		stmt.each(params, onRow, onComplete);
	});
}

// ----------------------------------------------------------------------------
export function runAndFinalize<T>(db: sqlite3.Database, sql: string, params?, pass?: T): IPromise<T> {
	return prepareStatement(db, sql).then(function(stmt) {
		return runStatement(stmt, params);
	}).then(function(stmt) {
		return finalizeStatement<T>(stmt, pass);
	});
}

export function runAndClose<T>(db: sqlite3.Database, sql: string, params?, pass?: T): IPromise<T> {
	return runAndFinalize(db, sql, params).then(function() {
		return closeDatabase<T>(db, pass);
	});
}

export function queryAndFinalize<T>(db: sqlite3.Database, sql: string, params?): IPromise<T[]> {
	return prepareStatement(db, sql).then(function(stmt) {
		return queryStatement<T>(stmt, params);
	}).then(function(result) {
		return finalizeStatement(result.statement, result.rows);
	});
}

export function queryAndClose<T>(db: sqlite3.Database, sql: string, params?): IPromise<T[]> {
	return queryAndFinalize<T>(db, sql, params).then(function(rows) {
		return closeDatabase(db, rows);
	});
}

export function observeQueryAndFinalize<T>(db: sqlite3.Database, sql: string, observer: IObserver<T>, params?): IPromise<void> {
	return prepareStatement(db, sql).then(function(stmt) {
		return observeQueryStatement<T>(stmt, observer, params);
	}).then(function(stmt) {
		return finalizeStatement<void>(stmt);
	});
}

export function observeQueryAndClose<T>(db: sqlite3.Database, sql: string, observer: IObserver<T>, params?): IPromise<void> {
	return observeQueryAndFinalize<T>(db, sql, observer, params).then(function() {
		return closeDatabase<void>(db);
	});
}

// ----------------------------------------------------------------------------

function createPromise(deferral: (resolve, reject) => void) {
	return new Promise(deferral);
}