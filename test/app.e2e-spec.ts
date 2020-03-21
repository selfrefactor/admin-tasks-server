import {envFn} from 'env-fn'
envFn('special')
import axios from 'axios'
import {pass} from 'rambdax'
import {async} from 'rxjs/internal/scheduler/async'

const URL = 'http://localhost:8080'
const WORD_PROFILE = `${URL}/word-profile`
const PETS = `${URL}/pets`

describe('Word profile', () => {
  test('orm', async() => {
    await axios.get(`${PETS}/foo`)
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
