/**
 * Load script by url.
 *
 * @param url - The url of the script.
 */
export function loadScript(url: string): Promise<Event> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}
