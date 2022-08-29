// 判断类型
export function type(target, type) {
  const dataType = Object.prototype.toString
    .call(target)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase()
  return type ? dataType === type : dataType
}

// 深拷贝
export function deepCopy(object) {
  let target = Array.isArray(object) ? [] : {}
  if (object && typeof object === 'object') {
    for (let key in object) {
      if (Object.hasOwn(object, key)) {
        if (object[key] && typeof object[key] === 'object') {
          target[key] = deepCopy(object[key])
        } else {
          target[key] = object[key]
        }
      }
    }
  }
  return target
}

// 防抖
export function debounce(fn, delay = 200, immediate = false) {
  let timer = null
  let count = 0 // 外部函数调用次数
  return function () {
    count++
    if (immediate && !timer) { // 是否立即执行
      fn.apply(this, arguments)
    }
    if (timer) { // 取消之前定时器
      clearTimeout(timer)
    }
    // 设定定时器
    timer = setTimeout(() => {
      (count > 1 || !immediate) && fn.apply(this, arguments) // 立即执行条件下多次调用，或非立即执行条件下，执行fn
      timer = null
    }, delay)
  }
}

// 节流
export function throttle(fn, delay = 200, immediate = false) {
  let canRun = true
  let count = 0 // 外部函数调用次数
  return function () {
    count++
    if (immediate && count === 1) { // 立即执行条件下的第一次调用
      fn.apply(this, arguments)
    }
    if (canRun) {
      canRun = false
      setTimeout(() => {
        (count > 1 || !immediate) && fn.apply(this, arguments) // 立即执行条件下多次调用，或非立即执行条件下，执行fn
        canRun = true
      }, delay)
    }
  }
}

// 生成随机id
export function uuid(length, chars) {
  chars = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  length = length || 8
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

// async错误处理
export function to(promise) {
  return promise.then((data) => [null, data]).catch((err) => [err, null])
}

// 获取url中的参数
export function getUrlParam(url = location.href) {
  let obj = {}
  let param = url.split('?')[1]
  if (param) {
    let items = param.split('&')
    for (let item of items) {
      let arr = item.split('=')
      obj[arr[0]] = arr[1]
    }
  }
  return obj
}

// base64转blob
export function dataUrl2Blob(dataUrl, type) {
  let data = dataUrl.split(',')[1]
  let mime = dataUrl.match(/^data:(.*?)(;base64)?,/)[1]
  let binStr = atob(data)
  let len = binStr.length
  let arr = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i)
  }
  return new Blob([arr], {type: type || mime})
}

// 同步等待
export function wait(delay) {
  let start = (new Date()).getTime()
  while ((new Date()).getTime() - start < delay) {
    continue
  }
}
