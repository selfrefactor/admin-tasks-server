import axios from 'axios'
import {pass} from 'rambdax'

const URL = 'http://localhost:8080'

describe('Actual requests against running dev server', () => {
  it('/ (GET)', async () => {
    const a = await axios.get(URL)
    console.log(a.data)
  })

  test('create/delete word profile instance', async () => {
    const toSave = {
      word: 'baz',
      related: [{translated: 'foo'}],
    }
    const {data: saved} = await axios.post(`${URL}/word-profile/create`, toSave)
    expect(pass(saved)({related: Array})).toBeTruthy()
    expect(pass(saved)({related: [{translated: String}]})).toBeTruthy()
    const {data: deleted} = await axios.post(`${URL}/word-profile/remove`, {
      _id: saved._id,
    })
    console.log(deleted)
  })
})
