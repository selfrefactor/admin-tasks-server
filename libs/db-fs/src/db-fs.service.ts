import {Injectable} from '@nestjs/common'
import {init, loadJson, loadKeys, load, save} from 'db-fn'
import {DATA_LOCATION} from 'lib/constants'
import { piped,remove } from 'rambdax'
import { wordsX } from 'string-fn'

export const itemNotFound = (id: string) =>
  `Item with id '${id}' was not found`

type AllowedLabels = 'word.profile'

@Injectable()
export class DbFsService {
  constructor() {
    init(DATA_LOCATION)
  }
  createKeyForUrl(url: string) {
    const cleaner = piped(url, remove('https://'), remove('http://'))
    return wordsX(cleaner).join('.')
  }
  async updateOrGetKey(label: string, id: string, newValue: unknown) {
    const intermediateResult = await load(id, label)
    if(intermediateResult) return intermediateResult

    await save(newValue, label, id)

    return newValue
  }
  async getKeys(label: AllowedLabels) {
    return loadKeys(label)
  }
  async getItem<T>(label: AllowedLabels, id: string): Promise<T> {
    const maybeResult = await loadJson('word.profile', id)
    if (!maybeResult) throw new Error(itemNotFound(id))

    return loadJson(label, id)
  }
}
