import {envFn} from 'env-fn'
envFn('special')
import axios from 'axios'
import {log} from 'helpers-fn'
import {pass} from 'rambdax'

const URL = 'http://localhost:8080'
const LAMBDAS = `${URL}/lambdas`
const SPEED_READER = `${LAMBDAS}/speed-reader`
const WORD_PROFILE = `${LAMBDAS}/word-profile`

const getErrorMessage = (status: number) => {
  return `Request failed with status code ${status}`
}

const willFail = () => {
  expect('willFail').toBe('should never be reached')
}

const password = process.env.API_ACCESS_TOKEN

let allowTest = true

describe('API', () => {
  beforeAll(async() => {
    try {
      await axios.get(URL)
    } catch (error) {
      log('Server is not ON and e2e tests are skipped', 'warning')
      allowTest = false
    }
  })

  test('auth - without token', async() => {
    if (!allowTest) return
    try {
      await axios.post(`${LAMBDAS}/speed-reader`, {id: 99})
      willFail()
    } catch (e) {
      expect(e.message).toBe(getErrorMessage(403))
    }
  })

  test('auth - without body', async() => {
    if (!allowTest) return
    try {
      await axios.post(`${LAMBDAS}/speed-reader`)
      willFail()
    } catch (e) {
      expect(e.message).toBe(getErrorMessage(403))
    }
  })

  test('auth - get is bypassed', async() => {
    if (!allowTest) return
    await expect(axios.get(`${LAMBDAS}/`)).resolves.not.toThrow()
  })

  test('word profile - get all words', async() => {
    if (!allowTest) return
    const {data} = await axios.post(`${WORD_PROFILE}/all-words`, {password})
    expect(data).toBeTruthy()
    expect(pass(data)([String])).toBeTruthy()
  })

  test('word profile - get single word', async() => {
    if (!allowTest) return
    const {data} = await axios.post(WORD_PROFILE, {
      password,
      word: 'abbringen',
    })
    expect(data).toBeTruthy()
  })

  test('word profile - get single word - fail', async() => {
    if (!allowTest) return
    try {
      await axios.post(WORD_PROFILE, {password, word: 'foo'})
      willFail()
    } catch (e) {
      expect(e.message).toBe(getErrorMessage(400))
    }
  })

  test('speed reader - demo index', async() => {
    if (!allowTest) return
    const body = {id: 99, password}
    const {data} = await axios.post(SPEED_READER, body)
    expect(pass(data)([String])).toBeTruthy()
  })

  test('speed reader - wrong index', async() => {
    if (!allowTest) return
    try {
      const body = {id: 99, password}
      await axios.post(`${LAMBDAS}/speed-reader`, body)
    } catch (e) {
      expect(e.message).toBe(getErrorMessage(400))
    }
  })

  test('speed reader - missing input', async() => {
    if (!allowTest) return
    try {
      await axios.post(`${LAMBDAS}/speed-reader`)
      willFail()
    } catch (e) {
      expect(e.message).toBe(getErrorMessage(403))
    }
  })
})
