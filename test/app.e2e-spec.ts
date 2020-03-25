import {envFn} from 'env-fn'
envFn('special')
import axios from 'axios'
import {log} from 'helpers'
import {pass} from 'rambdax'

const URL = 'http://localhost:8080'
const WORD_PROFILE = `${URL}/word-profile`
const PETS = `${URL}/pets`
const LAMBDAS = `${URL}/lambdas`

const getErrorMessage = status => {
  return `Request failed with status code ${status}`
}

const willFail = () => {
  expect('willFail').toBe('should be reached')
}

const password = process.env.API_ACCESS_TOKEN

let allowTest = true
 
describe('API', () => {
  beforeAll(async() => {
    try {
      await axios.get(URL)
    } catch (error) {
      log('Server is not ON and e2e tests are skipped','warning')
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
    await expect(
      axios.get(`${LAMBDAS}/`)
    ).resolves.not.toThrow();
  })

  test('speed reader - demo index', async() => {
    if (!allowTest) return
    const body = {id: 99, password}
    const {data} = await axios.post(`${LAMBDAS}/speed-reader`, body)
    expect(pass(data)([String])).toBeTruthy()
  })  


  test('speed reader - wrong index', async() => {
    if (!allowTest) return
    try {
      const body = {id: 99, password}
      await axios.post(`${LAMBDAS}/speed-reader`,body)
    } catch (e) {
      expect(e.message).toBe(getErrorMessage(400))
    }
  })

  test('speed reader - missing input', async() => {
    if (!allowTest) return
    try {
      await axios.post(`${LAMBDAS}/speed-reader`)
    } catch (e) {
      expect(e.message).toBe(getErrorMessage(403))
    }
  })

  test.skip('orm', async() => {
    await axios.get(`${PETS}/foo`)
    await axios.get(`${WORD_PROFILE}/foo`)
    // expect(data.length).toBeGreaterThan(100)
  })
  it.skip('/all (GET)', async() => {
    const {data} = await axios.get(`${WORD_PROFILE}/all`)
    expect(data.length).toBeGreaterThan(100)
  })

  it.skip('/add/:word (POST)', async() => {
    const a = await axios.post(`${WORD_PROFILE}/add`, {
      a: 1,
      token: process.env.API_ACCESS_TOKEN,
    })
  })

  test.skip('create/delete word profile instance', async() => {
    const toSave = {
      word: 'baz',
      related: [{translated: 'foo'}],
    }
    const {data: saved} = await axios.post(
      `${URL}/word-profile/create`,
      toSave
    )
    console.log(saved)
    expect(pass(saved)({related: Array})).toBeTruthy()
    expect(pass(saved)({related: [{translated: String}]})).toBeTruthy()
    const {data: deleted} = await axios.post(`${URL}/word-profile/remove`, {
      _id: saved._id,
    })
    console.log(deleted)
  })
})
