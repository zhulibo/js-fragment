/**
 *  get type of target.
 *
 * @param {*} target
 * @returns {string} type of target.
 */
export function getType(target: any): string {
  return Object.prototype.toString
    .call(target)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase()
}
