# Server is on

## Troubleshooting

- ECONNREFUSED ::1: - it did happen with `  await app.listen(PORT, '0.0.0.0')`

- creating lib - as `@app` is default, it leads to errors. try with `lib` instead.

## Marbles

`jest-marbles` require `6.6.2` version of `rxjs` even though the whole app works with `7.0.0.beta`

## Scripts

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

## Yarn check

It runs check on dependencies versions

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
