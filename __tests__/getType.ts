import { getType } from '../src/getType'

describe('getType', () => {
  test('it properly be number', () => {
    expect(getType(1)).toBe('number')
  })
})
