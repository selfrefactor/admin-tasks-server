import {envFn} from 'env-fn'
envFn('special')
import axios from 'axios'
import {log} from 'helpers-fn'
import {isAttach} from 'rambdax'
isAttach()

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

async function failTestWrapper(fn: Promise<any>, expectedError: number) {
  if (!allowTest) return
  try {
    await fn
    willFail()
  } catch (e) {
    expect(e.message).toBe(getErrorMessage(expectedError))
  }
}

describe('API', () => {
  beforeAll(async() => {
    try {
      await axios.get(URL)
    } catch (error) {
      log('Server is not ON and e2e tests are skipped', 'warning')
      allowTest = false
    }
  })

  test('random bg word', async() => {
    const response = await axios.post(`${LAMBDAS}/random-bulgarian-word`, {
      password,
    })
    expect(response.data.is(['string'])).toBeTruthy()
  })

  test('auth - without token', async() => {
    await failTestWrapper(
      axios.post(`${LAMBDAS}/speed-reader`, {id: 99}),
      403
    )
  })

  test('auth - without body', async() => {
    await failTestWrapper(axios.post(`${LAMBDAS}/speed-reader`), 403)
  })

  test('auth - get is bypassed', async() => {
    if (!allowTest) return
    await expect(axios.get(`${LAMBDAS}/`)).resolves.not.toThrow()
  })

  test('word profile - get all words', async() => {
    if (!allowTest) return
    const {data} = await axios.post(`${WORD_PROFILE}/all-words`, {password})
    expect(data).toBeTruthy()
    expect(data.is([String])).toBeTruthy()
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
    await failTestWrapper(
      axios.post(WORD_PROFILE, {password, word: 'foo'}),
      400
    )
  })

  test('speed reader - demo index', async() => {
    if (!allowTest) return
    const body = {id: 99, password}
    const {data} = await axios.post(SPEED_READER, body)
    expect(data.is([String])).toBeTruthy()
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
