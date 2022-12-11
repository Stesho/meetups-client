// Create interface Array<T> with following arrays method: pop, push, sort, indexOf, every, map, filter, reduce.

interface Arr<T> {
  slice(start?: number, end?: number): T[];
  pop(): T | undefined;
  push(value: T | T[]): number;
  sort(callback: (a: T, b: T) => number): T[];
  indexOf(value: T, fromIndex: number): number;
  every(callback: (element: T, index: number, array: T[]) => boolean, thisArg: object): boolean;
  map(callback: (element: T, index: number, array: T[]) => any, thisArg: object): any;
  filter(callback: (element: T, index: number, array: T[]) => boolean, thisArg: object): T[];
  reduce(callback: (accumulator: any, currentValue: T, index: number, array: T[]) => boolean, initialValue: any): any;
}
