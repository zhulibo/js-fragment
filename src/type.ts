// 判断类型
export function type(target: unknown, type?: string) {
  const dataType = Object.prototype.toString
    .call(target)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase()
  return type ? dataType === type : dataType
}
