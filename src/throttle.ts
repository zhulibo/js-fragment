/**
 * Throttle a function.
 *
 * @param {Function} fn The function to throttle.
 * @param {number} [delay=200] The number of milliseconds to delay.
 * @param {boolean} [immediate=true] Invoke immediately.
 * @returns {Function} The new throttled function.
 * @returns {Function.cancel} Cancel throttle.
 */
export function throttle<T extends (...args: any[]) => ReturnType<T>>(
  fn: T,
  delay: number = 200,
  immediate: boolean = true
): {
  (this: ThisParameterType<T>, ...args: Parameters<T>): void;
  cancel: () => void
} {

  let lastCallTime: number | null = null;
  // 追加fn调用的定时器
  let addedCallTimeout: ReturnType<typeof setTimeout> | null = null

  const _throttle = function(this: ThisParameterType<T>, ...args: Parameters<T>) {

    const now = Date.now()

    // 立即执行
    if(immediate) {
      if (!lastCallTime) {
        fn.apply(this, args)
        lastCallTime = now
      }
      else if (now - lastCallTime >= delay) {
        fn.apply(this, args)
        lastCallTime = now
      }
    }
    // 非立即执行
    else {
      if (!lastCallTime) {
        lastCallTime = now
        // 用定时器追加一次fn调用，防止未达到最小时间间隔fn未被调起
        addedCallTimeout = setTimeout(() => {
          fn.apply(this, args)
          lastCallTime = Date.now()
        }, delay)
      }
      else if (now - lastCallTime >= delay) {
        fn.apply(this, args)
        lastCallTime = now
        // 达到最小时间间隔fn调用成功，则清除追加的fn调用
        if (addedCallTimeout) {
          clearTimeout(addedCallTimeout)
        }
      }
    }

  }

  // 取消节流
  _throttle.cancel = () => {
    if (addedCallTimeout) clearTimeout(addedCallTimeout)
    lastCallTime = null
  }

  return _throttle
}
