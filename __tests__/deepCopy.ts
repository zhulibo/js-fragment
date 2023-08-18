import { deepCopy } from '../src/deepCopy'

describe('test deepCopy', () => {
  test('should support number', () => {
    expect(deepCopy(123)).toBe(123)
  })
  test('should support string', () => {
    expect(deepCopy('hi')).toBe('hi')
  })
  test('should support array', () => {
    expect(deepCopy([1, 2, 3])).toEqual([1, 2, 3])
  })
  test('should support object', () => {
    expect(deepCopy({a: {b: 1}})).toEqual({a: {b: 1}})
  })
  test('should support function', () => {
    const fn = () => {}
    expect(deepCopy(fn)).toEqual(fn)
  })
  test('should support object with function', () => {
    const fn = () => {}
    expect(deepCopy({a: fn, b: 1})).toEqual({a: fn, b: 1})
  })
})
