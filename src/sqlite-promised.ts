/// <reference path="../typings/sqlite3/sqlite3.d.ts" />
/// <reference path="../node_modules/lz-tslib-interfaces/IPromise.d.ts" />
/// <reference path="ISqliteDatabase.d.ts" />
/// <reference path="IStatementComposite.d.ts" />

//TODO: comment code

import sqlite3 = require('sqlite3');
var Promise = require('promiz');

export function openDatabase(filePath: string): IPromise<ISqliteDatabase> {
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

export function closeDatabase<T>(db: ISqliteDatabase, pass?: T): IPromise<T> {
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

export function prepareStatement(db: ISqliteDatabase, sql: string): IPromise<ISqliteStatement> {
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

export function finalizeStatement<T>(stmt: ISqliteStatement, pass?: T): IPromise<T> {
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

export function runStatement(stmt: ISqliteStatement, params?): IPromise<ISqliteStatement> {
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

export function queryStatement<T>(stmt: ISqliteStatement, params?): IPromise<IStatementComposite<T[]>> {
	return createPromise(function(resolve, reject) {
		stmt.all(params, function(error, rows: any[]) {
			if (error) {
				reject(error);
			} else {
				resolve({ passedValue: rows, statement: stmt });
			}
		});
	});
}

// ----------------------------------------------------------------------------
export function runAndFinalize<T>(db: ISqliteDatabase, sql: string, params?, pass?: T): IPromise<T> {
	return prepareStatement(db, sql).then(function(stmt) {
		return runStatement(stmt, params);
	}).then(function(stmt) {
		return finalizeStatement<T>(stmt, pass);
	});
}

export function runAndClose<T>(db: ISqliteDatabase, sql: string, params?, pass?: T): IPromise<T> {
	return runAndFinalize(db, sql, params).then(function() {
		return closeDatabase<T>(db, pass);
	});
}

export function queryAndFinalize<T>(db: ISqliteDatabase, sql: string, params?): IPromise<T[]> {
	return prepareStatement(db, sql).then(function(stmt) {
		return queryStatement<T>(stmt, params);
	}).then(function(result) {
		return finalizeStatement(result.statement, result.passedValue);
	});
}

export function queryAndClose<T>(db: ISqliteDatabase, sql: string, params?): IPromise<T[]> {
	return queryAndFinalize<T>(db, sql, params).then(function(rows) {
		return closeDatabase(db, rows);
	});
}

// ----------------------------------------------------------------------------

function createPromise(deferral: (resolve, reject) => void) {
	return new Promise(deferral);
}