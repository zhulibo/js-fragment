import { getType } from '../src/fragment/getType'

describe('test getType', () => {
  test('it properly be number', () => {
    expect(getType(666)).toBe('number')
  })
  test('it properly be string', () => {
    expect(getType('hi')).toBe('string')
  })
  test('it properly be object', () => {
    expect(getType({a: 1})).toBe('object')
  })
})
