import { init, loadJson, save } from 'db-fn'
import { log } from 'helpers'
import { mapAsyncLimit, omit } from 'rambdax'
import { camelCase } from 'string-fn'

import { DATA_LOCATION } from './constants'
import { MongooseInstanceFn } from './mongo.js'
import { readAll } from './schemas'
import { syncDataRepo } from './syncDataRepo'
init(DATA_LOCATION)

void (async function exportLearnSmarter(){
  const fsDbLabel = 'word_profile'
  const mongoLabel = camelCase(fsDbLabel)

  const MongooseInstance = MongooseInstanceFn()
  await MongooseInstance.connect()
  const allRecords = await readAll(mongoLabel)

  let dirty = false
  const setDirty = () => {
    if (dirty) return
    dirty = true
  }
  let skippedCounter = 0

  const iterable = async ({ _doc: x }) => {
    const loaded = await loadJson(fsDbLabel, x.word)
    const toSave = omit('__v,_id', x)

    if (loaded === undefined){
      setDirty()
      log(`Saved - '${ toSave.word }'`, 'success')

      return save(
        toSave, fsDbLabel, toSave.word
      )
    }
    skippedCounter++
  }

  await mapAsyncLimit(
    iterable, 5, allRecords
  )

  if (dirty) await syncDataRepo()
  if( skippedCounter) log(`Skipped - '${ skippedCounter }'`, 'info')  
  
  process.exit()
})()
