/**
 * Debounce a function.
 *
 * @param {Function} fn The function to debounce.
 * @param {number} [delay=200] The number of milliseconds to delay.
 * @param {boolean} [immediate=false] Invoke immediately.
 * @param {boolean} [immediateInterval=false] After a while, whether it is still invoke immediately.
 * @returns {Function} The new debounced function.
 * @returns {Function.cancel} Cancel debounce.
 */
export declare function debounce<T extends (...args: any[]) => ReturnType<T>>(fn: T, delay?: number, immediate?: boolean, immediateInterval?: boolean): {
    (this: ThisParameterType<T>, ...args: Parameters<T>): void;
    cancel: () => void;
};
