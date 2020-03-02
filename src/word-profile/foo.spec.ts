import {foo} from './foo'

test('happy', () => {
  expect(foo(1)).toBe(3)
  expect(foo(0)).toBe(1)
})
