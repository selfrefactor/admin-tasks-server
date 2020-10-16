import {omit, path, last, equals} from 'rambdax'
import {randomString} from 'string-fn'
import axios from 'axios'
import {Item} from '../src/items/interfaces/item.interface'
import {envFn} from 'env-fn'
import {DEFAULT_PORT} from 'lib/constants'
envFn('special')

const URL = `http://localhost:8080`
// const URL = `http://localhost:${DEFAULT_PORT}`
const GRAPH = `${URL}/graphql`

describe('Graphql', () => {
  const item: Item = {
    word: randomString(3, true).toLowerCase(),
  }
  item /*?*/

  // const updatedItem: Item = {
  //   title: 'Great updated item',
  //   price: 20,
  //   description: 'Updated description of this great item',
  // }

  const createitemObject = JSON.stringify(item).replace(
    /\"([^(\")"]+)\":/g,
    '$1:'
  )

  const createItemQuery = `
  mutation {
    createItem(input: ${createitemObject}) {
      word
    }
  }`

  test('createItem', async() => {
    try {
      const response = await axios.post(`${URL}/graphql`, {
        operationName: null,
        query: createItemQuery,
      })
      const result = omit('id', path('data.data.createItem', response))
      expect(result).toEqual(item)
    } catch (e) {
      console.log(e)
    }
  })

  test('read single item', async() => {
    try {
      const response = await axios({
        url: GRAPH,
        method: 'post',
        data: {
          query: `{ items { word } }`,
        },
      })
      const allItems = path<Item[]>('data.data.items', response)
      const lastItem /*?*/ = last(allItems)
      // expect(equals(lastItem, item)).toBe(true)
    } catch (e) {
      console.log(e)
      expect(0).toBe(1)
    }
  })

  test('update single item', async() => {
    try {
      const input = {word: 'asn', newWord: 'bar111'}
      const updateItemObject = JSON.stringify(input).replace(
        /\"([^(\")"]+)\":/g,
        '$1:'
      )
      const updateItemQuery = `
    mutation {
      updateItem(input: ${updateItemObject}) {
        word
      }
    }`
      const response = await axios({
        url: GRAPH,
        method: 'post',
        data: {
          query: updateItemQuery,
        },
      })
      response /*? $.data.errors*/
    } catch (e) {
      console.log(e /*? $.config */)
      expect(0).toBe(1)
    }
  })

  // it('deleteItem', () => {
  //   const deleteItemQuery = `
  //     mutation {
  //       deleteItem(id: "${id}") {
  //         title
  //         price
  //         description
  //         id
  //       }
  //     }`;

  //   return request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       operationName: null,
  //       query: deleteItemQuery,
  //     })
})
