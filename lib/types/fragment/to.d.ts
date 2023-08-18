/**
 * wrap promise with try catch return [err, data].
 *
 * @param {Promise} promise
 * @returns {Promise} if promise resolve, return [null, data], else return [err, undefined].
 */
export declare function to<T>(promise: Promise<T>): Promise<[Error, undefined] | [null, T]>;
