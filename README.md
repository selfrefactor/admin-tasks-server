# Server is on

## Scripts

### Books

`yarn books` - when new books are downloaded

### Lint folder

`yarn folders` - lint folder structure 

## Issues

Service importing service can lead to circular dependency while testing the service. Resolved by direct relative import.(Actually the issue was related to namespacing as there was already library `lib/fs` and the problem library was `fs-db`. Once the name was changed to `db-fs` the problem was solved.)

---

Other issue is that it caches `node_modules` which is fixed by command `Update file snapshots`

---

> Wallaby

It could stop work for wrong `Jest` version in this project's `package.json`

## Supported routes

Check `app.e2e-spec.ts` file

## Speed reader

List of books

```
const hash = {
  0: 'udhaus_fred',
  1: 'udhaus_napred',
  2: 'udhaus_pari',
  3: 'udhaus_pylnolunie',
  4: 'udhaus_radost',
  5: 'udi',
  6: 'voltaire',
  7: 'sunset',
  8: 'too_human',
  9: 'zaratustra',
  10: 'gogol',
  99: 'demo',
}
```

## Postponed TypeORM

```javascript
  test.skip('create/delete word profile instance', async() => {
    const toSave = {
      word: 'baz',
      related: [{translated: 'foo'}],
    }
    const {data: saved} = await axios.post(
      `${URL}/word-profile/create`,
      toSave
    )
    expect(pass(saved)({related: Array})).toBeTruthy()
    expect(pass(saved)({related: [{translated: String}]})).toBeTruthy()
    const {data: deleted} = await axios.post(`${URL}/word-profile/remove`, {
      _id: saved._id,
    })
    console.log(deleted)
  })
```