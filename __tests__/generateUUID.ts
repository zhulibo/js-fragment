import { generateUUID } from '../src/fragment/generateUUID'

describe('test generateUUID', () => {
  test('length should be 8', () => {
    expect(generateUUID().length).toBe(8)
  })
  test('length should be 10', () => {
    expect(generateUUID(10).length).toBe(10)
  })
})
