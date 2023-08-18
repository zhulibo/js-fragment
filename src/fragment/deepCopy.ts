/**
 * Deep copies.
 *
 * @param {*} target Target value to be copied.
 * @returns {*} The deep copy of the target.
 */

const map = new Map()

export function deepCopy<T>(target: T): T {
  if (typeof target === 'object') {
    const res = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, res)
    for (const key in target) {
      (res as any)[key] = deepCopy(target[key])
    }
    return res as T
  }
  else {
    return target
  }
}
