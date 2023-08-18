/**
 * Loads css by css code or url into the document.
 *
 * @param css - The css code or url.
 */
export function loadCss(css: string): void {
  if(css.indexOf('http') === 0) {
    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = css
    document.head.appendChild(link)
  }
  else {
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(css))
    document.head.appendChild(style)
  }
}
