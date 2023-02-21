export type FunctionType = (...args: any[]) => any;
export type Properties<T> = Pick<T, { [K in keyof T]: T[K] extends FunctionType ? never : K }[keyof T]>;