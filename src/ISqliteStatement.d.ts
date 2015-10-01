interface ISqliteStatement {
	bind(callback?: (err: Error) => void): ISqliteStatement;
	bind(...params: any[]): ISqliteStatement;
	
	reset(callback?: (err: Error) => void): ISqliteStatement;
	
	finalize(callback?: (err: Error) => void): ISqliteStatement;
	
	run(callback?: (err: Error) => void): ISqliteStatement;
	run(...params: any[]): ISqliteStatement;
	
	get(callback?: (err: Error, row: any) => void): ISqliteStatement;
	get(...params: any[]): ISqliteStatement;
	
	all(callback?: (err: Error, rows: any[]) => void): ISqliteStatement;
	all(...params: any[]): ISqliteStatement;
	
	each(callback?: (err: Error, row: any) => void, complete?: (err: Error, count: number) => void): ISqliteStatement;
	each(...params: any[]): ISqliteStatement;
}