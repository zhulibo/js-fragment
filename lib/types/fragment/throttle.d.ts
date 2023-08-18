/**
 * Throttle a function.
 *
 * @param {Function} fn The function to throttle.
 * @param {number} [delay=200] The number of milliseconds to delay.
 * @param {boolean} [immediate=true] Invoke immediately.
 * @returns {Function} The new throttled function.
 * @returns {Function.cancel} Cancel throttle.
 */
export declare function throttle<T extends (...args: any[]) => ReturnType<T>>(fn: T, delay?: number, immediate?: boolean): {
    (this: ThisParameterType<T>, ...args: Parameters<T>): void;
    cancel: () => void;
};
