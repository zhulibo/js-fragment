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
export function debounce<T extends (...args: any[]) => ReturnType<T>>(
  fn: T,
  delay: number = 200,
  immediate: boolean = false,
  immediateInterval: boolean = false
): {
  (this: ThisParameterType<T>, ...args: Parameters<T>): void;
  cancel: () => void
} {

  let timeout: ReturnType<typeof setTimeout> | null = null
  let callCount = 0 // 调用次数

  const _debounce = function(this: ThisParameterType<T>, ...args: Parameters<T>) {

    // 立即执行
    if (immediate) {
      // 第一次调用，立即执行
      if (callCount === 0) {
        fn.apply(this, args)
      }
      callCount++
      // 清除定时器
      if (timeout) clearTimeout(timeout)
      // 设定定时器
      timeout = setTimeout(() => {
        // 非第一次调用，执行回调
        if (callCount > 1) {
          fn.apply(this, args)
        }
        // 调用结束后重置调用次数，过一会再调，是否立即执行
        if (immediateInterval) {
          callCount = 0
        }
      }, delay)
    }

    // 非立即执行
    else {
      // 清除定时器
      if (timeout) clearTimeout(timeout)
      // 设定定时器
      timeout = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }

  }

  // 取消防抖
  _debounce.cancel = () => {
    if (timeout) clearTimeout(timeout)
    timeout = null
    callCount = 0
  }

  return _debounce
}
