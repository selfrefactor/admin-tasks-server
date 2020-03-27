# Server is on

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

---

Becase we need only one server

```javascript
export async function wordProfileDataAnt(currentWord, token){
  if (!token) return
  const { data } = await post(`${ API_URL }/word-profile/get/${ currentWord }`, { token })

  return data
}
```