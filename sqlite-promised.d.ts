/// <reference path="typings/sqlite3/sqlite3" />
/// <reference path="IPromise" />
/// <reference path="ISqliteDatabase" />
/// <reference path="ISqliteStatement" />
/// <reference path="IStatementComposite" />

declare module 'sqlite-promised' {
	export function openDatabase(filePath: string): IPromise<ISqliteDatabase>;
	export function closeDatabase<T>(db: ISqliteDatabase, pass?: T): IPromise<T>;
	export function prepareStatement(db: ISqliteDatabase, sql: string): IPromise<ISqliteStatement>;
	export function finalizeStatement<T>(stmt: ISqliteStatement, pass?: T): IPromise<T>;
	export function runStatement(stmt: ISqliteStatement, params?: any): IPromise<ISqliteStatement>;
	export function queryStatement<T>(stmt: ISqliteStatement, params?: any): IPromise<IStatementComposite<T[]>>;
	export function runAndFinalize<T>(db: ISqliteDatabase, sql: string, params?: any, pass?: T): IPromise<T>;
	export function runAndClose<T>(db: ISqliteDatabase, sql: string, params?: any, pass?: T): IPromise<T>;
	export function queryAndFinalize<T>(db: ISqliteDatabase, sql: string, params?: any): IPromise<T[]>;
	export function queryAndClose<T>(db: ISqliteDatabase, sql: string, params?: any): IPromise<T[]>;
}