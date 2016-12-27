declare module 'sqlite-promised' {
	import * as sqlite3 from 'sqlite3';
	export function openDatabaseAsync(filePath: string): Promise<sqlite3.Database>;
	export function closeDatabaseAsync(db: sqlite3.Database): Promise<void>;
	export function prepareStatementAsync(db: sqlite3.Database, sql: string): Promise<sqlite3.Statement>;
	export function finalizeStatementAsync(stmt: sqlite3.Statement): Promise<void>;
	export function runStatementAsync(stmt: sqlite3.Statement, params?: any): Promise<void>;
	export function queryStatementAsync<T>(stmt: sqlite3.Statement, params?: any): Promise<T[]>;
	export function runAndFinalizeAsync(db: sqlite3.Database, sql: string, params?: any): Promise<void>;
	export function runAndCloseAsync(db: sqlite3.Database, sql: string, params?: any): Promise<void>;
	export function queryAndFinalizeAsync<T>(db: sqlite3.Database, sql: string, params?: any): Promise<T[]>;
	export function queryAndCloseAsync<T>(db: sqlite3.Database, sql: string, params?: any): Promise<T[]>;
}