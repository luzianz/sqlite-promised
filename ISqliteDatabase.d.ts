/// <reference path="typings/node/node" />
/// <reference path="ISqliteStatement" />

interface ISqliteDatabase {
	close(callback?: (err: Error) => void): void;
	
	run(sql: string, callback?: (err: Error) => void): ISqliteDatabase;
	run(sql: string, ...params: any[]): ISqliteDatabase;
	
	get(sql: string, callback?: (err: Error, row: any) => void): ISqliteDatabase;
	get(sql: string, ...params: any[]): ISqliteDatabase;
	
	all(sql: string, callback?: (err: Error, rows: any[]) => void): ISqliteDatabase;
	all(sql: string, ...params: any[]): ISqliteDatabase;
	
	each(sql: string, callback?: (err: Error, row: any) => void, complete?: (err: Error, count: number) => void): ISqliteDatabase;
	each(sql: string, ...params: any[]): ISqliteDatabase;
	
	exec(sql: string, callback?: (err: Error) => void): ISqliteDatabase;
	
	prepare(sql: string, callback?: (err: Error) => void): ISqliteStatement;
	prepare(sql: string, ...params: any[]): ISqliteStatement;
	
	serialize(callback?: () => void): void;
	parallelize(callback?: () => void): void;
	
	on(event: "trace", listener: (sql: string) => void): ISqliteDatabase;
	on(event: "profile", listener: (sql: string, time: number) => void): ISqliteDatabase;
	on(event: "error", listener: (err: Error) => void): ISqliteDatabase;
	on(event: "open", listener: () => void): ISqliteDatabase;
	on(event: "close", listener: () => void): ISqliteDatabase;
	on(event: string, listener: Function): ISqliteDatabase;
}