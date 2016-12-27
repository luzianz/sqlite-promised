/// <reference path="typings/sqlite3/sqlite3.d.ts" />
/// <reference path="node_modules/lz-tslib-interfaces/IPromise.d.ts" />
/// <reference path="node_modules/lz-tslib-interfaces/IObserver.d.ts" />

declare module 'sqlite-promised' {
	import sqlite3 = require('sqlite3');
	export function openDatabase(filePath: string): IPromise<sqlite3.Database>;
	export function closeDatabase<T>(db: sqlite3.Database, pass?: T): IPromise<T>;
	export function prepareStatement(db: sqlite3.Database, sql: string): IPromise<sqlite3.Statement>;
	export function finalizeStatement<T>(stmt: sqlite3.Statement, pass?: T): IPromise<T>;
	export function runStatement(stmt: sqlite3.Statement, params?: any): IPromise<sqlite3.Statement>;
	export function queryStatement<T>(stmt: sqlite3.Statement, params?: any): IPromise<{statement: sqlite3.Statement, rows: T[]}>;
	export function observeQueryStatement<T>(stmt: sqlite3.Statement, observer: IObserver<T>, params?): IPromise<sqlite3.Statement>;
	export function runAndFinalize<T>(db: sqlite3.Database, sql: string, params?: any, pass?: T): IPromise<T>;
	export function runAndClose<T>(db: sqlite3.Database, sql: string, params?: any, pass?: T): IPromise<T>;
	export function queryAndFinalize<T>(db: sqlite3.Database, sql: string, params?: any): IPromise<T[]>;
	export function queryAndClose<T>(db: sqlite3.Database, sql: string, params?: any): IPromise<T[]>;
	export function observeQueryAndFinalize<T>(db: sqlite3.Database, sql: string, observer: IObserver<T>, params?): IPromise<void>;
	export function observeQueryAndClose<T>(db: sqlite3.Database, sql: string, observer: IObserver<T>, params?): IPromise<void>;
}