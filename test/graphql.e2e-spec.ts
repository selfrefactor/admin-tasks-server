import {omit, path, uuid} from 'rambdax'
import axios from 'axios'
import {Item} from '../src/items/interfaces/item.interface'
import {envFn} from 'env-fn'
envFn('special')

const URL = 'http://localhost:8080'
const GRAPH = `${URL}/graphql`

describe('Graphql', () => {
  const item: Item = {
    word: uuid(3, true).toLowerCase(),
  }

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

  it('createItem', async() => {
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

  it('foo', async() => {
    try {
      const response = await axios({
        url: GRAPH,
        method: 'post',
        data: {
          query: `{ items { word } }`,
        },
      })
      console.log(response.data)
      // const result = omit('id',path('data.data.createItem', response))
      // expect(result).toEqual(item)
    } catch (e) {
      console.log(e)
    }
  })

  // it('getItems', () => {
  //   return request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       operationName: null,
  //       query: '{items{title, price, description, id}}',
  //     })
  //     .expect(({ body }) => {
  //       const data = body.data.items;
  //       const itemResult = data[0];
  //       expect(data.length).toBeGreaterThan(0);
  //       expect(itemResult.title).toBe(item.title);
  //       expect(itemResult.description).toBe(item.description);
  //       expect(itemResult.price).toBe(item.price);
  //     })
  //     .expect(200);
  // });

  // const updateItemObject = JSON.stringify(updatedItem).replace(
  //   /\"([^(\")"]+)\":/g,
  //   '$1:',
  // );

  // it('updateItem', () => {
  //   const updateItemQuery = `
  //   mutation {
  //     updateItem(id: "${id}", input: ${updateItemObject}) {
  //       title
  //       price
  //       description
  //       id
  //     }
  //   }`;

  //   return request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       operationName: null,
  //       query: updateItemQuery,
  //     })
  //     .expect(({ body }) => {
  //       const data = body.data.updateItem;
  //       expect(data.title).toBe(updatedItem.title);
  //       expect(data.description).toBe(updatedItem.description);
  //       expect(data.price).toBe(updatedItem.price);
  //     })
  //     .expect(200);
  // });

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
  //     .expect(({ body }) => {
  //       const data = body.data.deleteItem;
  //       expect(data.title).toBe(updatedItem.title);
  //       expect(data.description).toBe(updatedItem.description);
  //       expect(data.price).toBe(updatedItem.price);
  //     })
  //     .expect(200);
  // });
})
