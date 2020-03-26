# Server is on

## Wallaby

It could stop work for wrong `Jest` version in this project's `package.json`

---

Other issue is that it caches `node_modules` which is fixed by command `Update file snapshots`

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