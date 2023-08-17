/*
* Generate a UUID
*
* @param {number} length - The length of the UUID
* @param {string} chars - The chars to generate UUID.
*/
export function generateUUID(
  length: number = 8,
  chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
) : string {
  let res = ''
  for (let i = 0; i < length; i++) {
    res += chars[Math.floor(Math.random() * chars.length)]
  }
  return res
}
