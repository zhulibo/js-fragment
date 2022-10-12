// 防抖
export function debounce(fn: Function, delay = 200, immediate = false) {
  let timer:any = null
  let count = 0 // 外部函数调用次数
  return function () {
    count++
    if (immediate && !timer) { // 是否立即执行
      // @ts-ignore
      fn.apply(this, arguments)
    }
    if (timer) { // 取消之前定时器
      clearTimeout(timer)
    }
    // 设定定时器
    timer = setTimeout(() => {
      // @ts-ignore
      (count > 1 || !immediate) && fn.apply(this, arguments) // 立即执行条件下多次调用，或非立即执行条件下，执行fn
      timer = null
    }, delay)
  }
}
