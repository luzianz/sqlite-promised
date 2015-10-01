/// <reference path="ISqliteStatement" />

interface IStatementComposite<T> {
	statement: ISqliteStatement;
	passedValue: T;
}