import * as sqlite3 from 'sqlite3';

export function openDatabaseAsync(filePath: string): Promise<sqlite3.Database> {
	return new Promise<sqlite3.Database>((resolve, reject) => {
		let db = new sqlite3.Database(filePath, error => {
			if (error) {
				reject(error);
			} else {
				resolve(db);
			}
		});
	});
}

export function closeDatabaseAsync(db: sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.close(error => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}

export function prepareStatementAsync(db: sqlite3.Database, sql: string): Promise<sqlite3.Statement> {
	return new Promise<sqlite3.Statement>((resolve, reject) => {
		let stmt = db.prepare(sql, error => {
			if (error) {
				reject(error);
			} else {
				resolve(stmt);
			}
		});
	});
}

export function finalizeStatementAsync(stmt: sqlite3.Statement): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		stmt.finalize(error => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}

export function runStatementAsync(stmt: sqlite3.Statement, params?): Promise<number> {
	return new Promise<number>((resolve, reject) => {
		stmt.run(params, error => {
			if (error) {
				reject(error);
			} else {
				resolve(this.lastID);
			}
		});
	});
}

export function queryStatementAsync<T>(stmt: sqlite3.Statement, params?): Promise<T[]> {
	return new Promise<T[]>((resolve, reject) => {
		stmt.all(params, (error, rows: T[]) => {
			if (error) {
				reject(error);
			} else {
				resolve(rows);
			}
		});
	});
}

// ----------------------------------------------------------------------------
export async function runAndFinalizeAsync(db: sqlite3.Database, sql: string, params?): Promise<number> {
	let stmt = await prepareStatementAsync(db, sql);
	const lastID = await runStatementAsync(stmt, params);
	await finalizeStatementAsync(stmt);
	return lastID;
}

export async function runAndCloseAsync(db: sqlite3.Database, sql: string, params?): Promise<number> {
	const lastID = await runAndFinalizeAsync(db, sql, params);
	await closeDatabaseAsync(db);
	return lastID;
}

export async function queryAndFinalizeAsync<T>(db: sqlite3.Database, sql: string, params?): Promise<T[]> {
	let stmt = await prepareStatementAsync(db, sql);
	let rows = await queryStatementAsync<T>(stmt, params);
	await finalizeStatementAsync(stmt);
	return rows;
}

export async function queryAndCloseAsync<T>(db: sqlite3.Database, sql: string, params?): Promise<T[]> {
	let rows = await queryAndFinalizeAsync<T>(db, sql, params);
	await closeDatabaseAsync(db);
	return rows;
}
