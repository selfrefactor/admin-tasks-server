import { envFn } from 'env-fn'
envFn('special')

import { init, loadJson, loadKeys } from 'db-fn'
import { mapAsyncLimit} from 'rambdax'
import { camelCase } from 'string-fn'

import { DATA_LOCATION } from './constants'
import { MongooseInstanceFn } from './mongo.js'
import { readWordProfile, save, deleteAll } from './schemas'
init(DATA_LOCATION)

void (async function initWordProfile(){
  const fsDbLabel = 'word_profile'
  const mongoLabel = camelCase(fsDbLabel)
  const MongooseInstance = MongooseInstanceFn()
  await MongooseInstance.connect()
  const allKeys = await loadKeys(fsDbLabel)

  console.time(mongoLabel)
  await deleteAll(mongoLabel)

  await mapAsyncLimit(
    async word => {
      const readResult = await readWordProfile(word, mongoLabel)
      if (readResult) return console.log(word, 'already here')

      const loaded = await loadJson(fsDbLabel, word)
      const saveResult = await save(loaded, mongoLabel)
      console.log(saveResult._id)
    },
    5,
    allKeys
  )
  console.timeEnd(mongoLabel)
  process.exit()
})()
