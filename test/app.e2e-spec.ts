import {envFn} from 'env-fn'
envFn('special')
import axios from 'axios'
import {pass} from 'rambdax'

const URL = 'http://localhost:8080'
const WORD_PROFILE = `${URL}/word-profile`
const PETS = `${URL}/pets`
const LAMBDAS = `${URL}/lambdas`

// jest.setTimeout(30000)

const getErrorMessage = (status) => {
  return `Request failed with status code ${status}`
}

describe('Word profile', () => {
  test('speed reader - demo index', async() => {
    const {data} = await axios.post(`${LAMBDAS}/speed-reader`, {id: 99})
    expect(pass(data)([String])).toBeTruthy()
  })

  test('speed reader - wrong index', async() => {
    try {
      await axios.post(`${LAMBDAS}/speed-reader`, {id: 44})
    } catch (e) {
      expect(e.message).toBe(getErrorMessage(400))  
    }
  })

  test('speed reader - missing input', async() => {
    try {
      await axios.post(`${LAMBDAS}/speed-reader`)
    } catch (e) {
      expect(e.message).toBe(getErrorMessage(400))  
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
