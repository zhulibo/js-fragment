// 加载css
export function loadCss(css: string): void {
  if(css.indexOf('http') === 0) {
    let link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = css
    document.head.appendChild(link)
  }
  else {
    let style = document.createElement('style')
    style.appendChild(document.createTextNode(css))
    document.head.appendChild(style)
  }
}
