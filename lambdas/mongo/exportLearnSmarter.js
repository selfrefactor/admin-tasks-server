import { init, loadJson, save } from 'db-fn'
import { log } from 'helpers'
import { equals, mapAsyncLimit, omit } from 'rambdax'
import { camelCase } from 'string-fn'

import { DATA_LOCATION } from './constants'
import { MongooseInstanceFn } from './mongo.js'
import { readAll } from './schemas'
import { syncDataRepo } from './syncDataRepo'
init(DATA_LOCATION)

void (async function exportLearnSmarter(){
  const fsDbLabel = 'learn_smarter'
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
    const loaded = await loadJson(fsDbLabel, x.id)
    const toSave = omit('__v,_id', x)

    if (loaded === undefined){
      setDirty()
      log(`Saved - '${ toSave.deWord }'`, 'success')

      return save(
        toSave, fsDbLabel, toSave.id
      )
    }

    if (equals(toSave, loaded)){
      return skippedCounter++
    }

    log(`Update - '${ toSave.deWord }'`, 'success')
    setDirty()

    return save(
      toSave, fsDbLabel, toSave.id
    )
  }

  await mapAsyncLimit(
    iterable, 10, allRecords
  )

  if (dirty) await syncDataRepo()
  if( skippedCounter) log(`Skipped - '${ skippedCounter }'`, 'info')  

  process.exit()
})()
