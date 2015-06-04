/// <reference path="typings/sqlite3/sqlite3.d.ts" />
/// <reference path="node_modules/lz-tslib-interfaces/IPromise" />

//TODO: comment code

import sqlite3 = require('sqlite3');

export interface IStatementComposite<T> {
	statement: sqlite3.Statement;
	passedValue: T;
}

export interface FPromiseGenerator {
	//TODO: figure out if 'deferral' is the correct term here
	(deferral: (resolve, reject) => void): any;
}

var _promiseGenerator: FPromiseGenerator;

/**
 * promiseGenerator: a function with a defferal as its argument, and returns a promise
 * defferal: a function with 2 arguments: resolve and reject
 * resolve: a function called passing in the result of a successful async callback
 * reject: a function called passing in the error of a failed async callback
 */
export function setPromiseGenerator(promiseGenerator: FPromiseGenerator) {
	_promiseGenerator = promiseGenerator;
}

export function openDatabase(filePath: string): IPromise<sqlite3.Database> {
	return createPromise(function (resolve, reject) {
		var db = new sqlite3.Database(filePath, function (error) {
			if (error) {
				reject(error);
			} else {
				resolve(db);
			}
		});
	});
}

export function closeDatabase<T>(db: sqlite3.Database, pass?: T): IPromise<T> {
	return createPromise(function (resolve, reject) {
		db.close(function (error) {
			if (error) {
				reject(error);
			} else {
				resolve(pass);
			}
		});
	});
}

export function prepareStatement(db: sqlite3.Database, sql: string): IPromise<sqlite3.Statement> {
	return createPromise(function (resolve, reject) {
		var stmt = db.prepare(sql, function (error) {
			if (error) {
				reject(error);
			} else {
				resolve(stmt);
			}
		});
	});
}

export function finalizeStatement<T>(stmt: sqlite3.Statement, pass?: T): IPromise<T> {
	return createPromise(function (resolve, reject) {
		stmt.finalize(function (error) {
			if (error) {
				reject(error);
			} else {
				resolve(pass);
			}
		});
	});
}

export function runStatement(stmt: sqlite3.Statement, params?): IPromise<sqlite3.Statement> {
	return createPromise(function (resolve, reject) {
		stmt.run(params, function (error) {
			if (error) {
				reject(error);
			} else {
				resolve(stmt);
			}
		});
	});
}

export function queryStatement<T>(stmt: sqlite3.Statement, params?): IPromise<IStatementComposite<T[]>> {
	return createPromise(function (resolve, reject) {
		stmt.all(params, function (error, rows: any[]) {
			if (error) {
				reject(error);
			} else {
				resolve({ passedValue: rows, statement: stmt });
			}
		});
	});
}

// ----------------------------------------------------------------------------
export function runAndFinalize<T>(db: sqlite3.Database, sql: string, params?, pass?: T): IPromise<T> {
	return prepareStatement(db, sql).then(function (stmt) {
		return runStatement(stmt, params);
	}).then(function (stmt) {
		return finalizeStatement<T>(stmt, pass);
	});
}

export function runAndClose<T>(db: sqlite3.Database, sql: string, params?, pass?: T): IPromise<T> {
	return runAndFinalize(db, sql, params).then(function () {
		return closeDatabase<T>(db, pass);
	});
}

export function queryAndFinalize<T>(db: sqlite3.Database, sql: string, params?): IPromise<T[]> {
	return prepareStatement(db, sql).then(function (stmt) {
		return queryStatement<T>(stmt, params);
	}).then(function (result) {
		return finalizeStatement(result.statement, result.passedValue);
	});
}

export function queryAndClose<T>(db: sqlite3.Database, sql: string, params?): IPromise<T[]> {
	return queryAndFinalize<T>(db, sql, params).then(function (rows) {
		return closeDatabase(db, rows);
	});
}

// ----------------------------------------------------------------------------

/**
 * This function simply wraps the _promiseGenerator variable, but throws
 * an error if it wasn't set.
 */
function createPromise(deferral: (resolve, reject) => void) {
	if (typeof _promiseGenerator == 'undefined') {
		//TODO: figure out a better error message
		throw new Error('you must first call setPromiseGenerator');
	}

	return _promiseGenerator(deferral);
}