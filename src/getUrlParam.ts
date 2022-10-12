// 获取url中的参数
export function getUrlParam(url = location.href) {
  let obj = {}
  let param = url.split('?')[1]
  if (param) {
    let items = param.split('&')
    for (let item of items) {
      let arr = item.split('=')
      // @ts-ignore
      obj[arr[0]] = arr[1]
    }
  }
  return obj
}
