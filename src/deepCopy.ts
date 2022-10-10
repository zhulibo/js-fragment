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
