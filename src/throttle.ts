// 节流
export function throttle(fn: Function, delay = 200, immediate = false) {
  let canRun = true
  let count = 0 // 外部函数调用次数
  return function () {
    count++
    if (immediate && count === 1) { // 立即执行条件下的第一次调用
      // @ts-ignore
      fn.apply(this, arguments)
    }
    if (canRun) {
      canRun = false
      setTimeout(() => {
        // @ts-ignore
        (count > 1 || !immediate) && fn.apply(this, arguments) // 立即执行条件下多次调用，或非立即执行条件下，执行fn
        canRun = true
      }, delay)
    }
  }
}