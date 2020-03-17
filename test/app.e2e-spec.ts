import axios from 'axios'
import {pass} from 'rambdax'

const URL = 'http://localhost:8080'
const WORD_PROFILE = `${URL}/word-profile`

describe('Actual requests against running dev server', () => {
  it('/all (GET)', async () => {
    const {data} = await axios.get(`${WORD_PROFILE}/all`)
    expect(data.length).toBeGreaterThan(100) 
  })

  test.skip('create/delete word profile instance', async () => {
    const toSave = {
      word: 'baz',
      related: [{translated: 'foo'}],
    } 
    const {data: saved} = await axios.post(`${URL}/word-profile/create`, toSave)
    console.log(saved) 
    expect(pass(saved)({related: Array})).toBeTruthy()
    expect(pass(saved)({related: [{translated: String}]})).toBeTruthy()
    const {data: deleted} = await axios.post(`${URL}/word-profile/remove`, {
      _id: saved._id,
    })
    console.log(deleted)
  })
})
