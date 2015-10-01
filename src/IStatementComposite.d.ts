/// <reference path="ISqliteStatement.d.ts" />

interface IStatementComposite<T> {
	statement: ISqliteStatement;
	passedValue: T;
}