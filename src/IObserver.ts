export interface IObserver<T> {
	// Notifies the observer that the provider has finished sending push-based
	// notifications.
	onCompleted(): void;

	// Notifies the observer that the provider has experienced an error condition.
	onError(error: Error): void;

	// Provides the observer with new data.
	onNext(item: T): void;
}
