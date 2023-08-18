import {wait} from "../src/fragment/wait"

describe('test wait', () => {
  test('should wait', () => {
    const start = (new Date()).getTime()
    wait(100)
    const end = (new Date()).getTime()
    expect(end - start).toBeGreaterThanOrEqual(100)
  })
})
