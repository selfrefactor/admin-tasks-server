import {  ok } from 'rambdax'
import {envFn} from 'env-fn'
envFn('special')
import axios from 'axios'
import { DEFAULT_PORT, DEV_PORT } from 'lib/constants'

let port
 
const URL = () => `http://localhost:${port}`
const LAMBDAS = () => `${URL()}/lambdas`
const SPEED_READER = () =>  `${LAMBDAS()}/speed-reader`
const WORD_PROFILE = () => `${LAMBDAS()}/word-profile`

const getErrorMessage = (status: number) => {
  return `Request failed with status code ${status}`
}

const willFail = () => {
  expect('this').toBe('should never be reached')
}

const password = process.env.API_ACCESS_TOKEN

async function failTestWrapper(fn: Promise<any>, expectedError: number) {
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
      await axios.get(`http://localhost:${DEFAULT_PORT}`)
      port = DEFAULT_PORT
    } catch (error) {
      port = DEV_PORT
    }
  })

  test('random bg word', async() => {
    LAMBDAS() /*?*/
    const response = await axios.post(`${LAMBDAS()}/random-bulgarian-word`, {
      password,
    })
    
    ok(response.data)([String])
  }) 

  test('auth - without token', async() => {
    await failTestWrapper(
      axios.post(`${LAMBDAS()}/speed-reader`, {id: 99}),
      403
    )
  }) 

  test('auth - without body', async() => {
    await failTestWrapper(axios.post(`${LAMBDAS()}/speed-reader`), 403)
  })

  test('auth - get is bypassed', async() => {
    await expect(axios.get(`${LAMBDAS()}/`)).resolves.not.toThrow()
  })

  test('word profile - get all words', async() => {
    const {data} = await axios.post(`${WORD_PROFILE()}/all-words`, {password})
    ok(data)([String])
  })

  test('word profile - get single word', async() => {
    const {data} = await axios.post(WORD_PROFILE(), {
      password,
      word: 'abbringen',
    })
    expect(data).toBeTruthy()
  })

  test('word profile - get single word - fail', async() => {
    await failTestWrapper(
      axios.post(WORD_PROFILE(), {password, word: 'foo'}),
      404
      // before it was 400
    )
  })

  test('speed reader - demo index', async() => {
    const body = {id: 99, password}
    const {data} = await axios.post(SPEED_READER(), body)
    ok(data)([String])
  })

  test('speed reader - missing input', async() => {
    try {
      await axios.post(`${LAMBDAS()}/speed-reader`)
      willFail()
    } catch (e) {
      expect(e.message).toBe(getErrorMessage(403))
    }
  })
})
