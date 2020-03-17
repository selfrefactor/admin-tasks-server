# Server is on

Becase we need only one dedicated server

```javascript

import { API_URL } from '../../constants'
import { post } from 'axios'

export async function wordProfileAddAnt(input, token){
  const { data } = await post(`${ API_URL }/word-profile/add/${ input }`, { token })

  return data
}
import { API_URL } from '../../constants'
import { post } from 'axios'

export async function wordProfileDataAnt(currentWord, token){
  if (!token) return
  const { data } = await post(`${ API_URL }/word-profile/get/${ currentWord }`, { token })

  return data
}
import { API_URL } from '../../constants'
import { post } from 'axios'

export async function wordProfileListAnt(token){
  const { data } = await post(`${ API_URL }/word-profile/list`, { token })

  return data
}
```