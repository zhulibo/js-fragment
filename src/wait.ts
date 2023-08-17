/**
 * Synchronous wait.
 *
 * @param {number} delay The number of milliseconds to delay.
 */
export function wait(delay: number): void {
  const start = (new Date()).getTime()
  while ((new Date()).getTime() - start < delay) { /* empty */ }
}
