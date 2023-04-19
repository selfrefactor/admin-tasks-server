import {delay, DELAY} from 'rambdax'
import {safeWait} from './utils'

test('safeWait - happy', async() => {
  const result = await safeWait(delay(100))
  expect(result).toBe(DELAY)
})

test('safeWait - when async function fails', async() => {
  async function fn() {
    await delay(100)
    JSON.parse('{a')
  }
  const result = await safeWait<void>(fn())
  expect(result).toBeUndefined()
})

test('safeWait - when constant declaration fails', async() => {
  const fn = async() => {
    await delay(100)
    JSON.parse('{a')
  }
  const result = await safeWait<void>(fn())
  expect(result).toBeUndefined()
})

test('safeWait - when promise fails', async() => {
  const fn = () => Promise.reject('foo')
  const result = await safeWait<void>(fn())
  expect(result).toBeUndefined()
})

test('safeWait - when promise resolves', async() => {
  const fn = () => Promise.resolve('foo')
  const result = await safeWait<string>(fn())
  expect(result).toBe('foo')
})
