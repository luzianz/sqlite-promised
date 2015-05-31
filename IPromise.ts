interface IPromise<T> {
	then<N>(onFulfilled?: (result?: T) => N | IPromise<N>, onRejected?: (reason?) => any): IPromise<N>;
}

export = IPromise;