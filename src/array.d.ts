interface Array<T> {
	myMap(callback: (value: T, index: number, array: T[]) => unknown): void;
}
