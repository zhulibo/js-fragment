// 同步等待
export function wait(delay: number) {
  let start = (new Date()).getTime()
  while ((new Date()).getTime() - start < delay) {
    continue
  }
}
