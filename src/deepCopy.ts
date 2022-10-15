// 深拷贝
export function deepCopy<T>(obj: T, map = new Map()): T {
  if (typeof obj === 'object') {
    let res = Array.isArray(obj) ? [] : {}
    if (map.get(obj)) {
      return map.get(obj)
    }
    map.set(obj, res)
    for (const key in obj) {
      // @ts-ignore
      res[key] = deepCopy(obj[key], map)
    }
    return res as T
  } else {
    return obj
  }
}
