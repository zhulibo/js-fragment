/**
 * Load js file by url.
 *
 * @param url - The url of the js file.
 */
export function loadJs(url: string): Promise<Event> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}
