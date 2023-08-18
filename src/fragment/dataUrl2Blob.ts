/**
 * Convert dataUrl to Blob.
 *
 * @param {string} dataUrl The dataUrl.
 * @param {string} [type] The optional MIME type. If not specified, the MIME type from the data URL will be used.
 * @returns {Blob}
 */
export function dataUrl2Blob(dataUrl: string, type?: string): Blob {
  const data = dataUrl.split(',')[1]
  const mime = dataUrl.match(/^data:(.*?)(;base64)?,/)![1]
  const binStr = atob(data)
  const len = binStr.length
  const arr = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i)
  }
  return new Blob([arr], {type: type || mime})
}
