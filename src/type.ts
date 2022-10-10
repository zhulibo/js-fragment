// 判断类型
export function type(target, type) {
  const dataType = Object.prototype.toString
    .call(target)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase()
  return type ? dataType === type : dataType
}
