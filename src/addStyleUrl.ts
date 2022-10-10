// 添加样式链接
export function addStyleUrl(url) {
  let link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  let head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
