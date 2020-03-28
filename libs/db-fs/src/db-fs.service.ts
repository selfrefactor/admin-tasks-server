import {Injectable} from '@nestjs/common'
import {init, loadJson, loadKeys} from 'db-fn'
import {DATA_LOCATION} from 'lib/constants'

export const itemNotFound = (id: string) =>
  `Such item with id '${id}' was not found`

type AllowedLabels = 'word.profile'

@Injectable()
export class DbFsService {
  constructor() {
    init(DATA_LOCATION)
  }
  async getKeys(label: AllowedLabels) {
    return loadKeys(label)
  }
  async getItem<T>(label: AllowedLabels, id: string): Promise<T> {
    const maybeResult = await loadJson('word.profile', id)
    if (!maybeResult) throw 'Item not found in db.fs'

    return loadJson(label, id)
  }
}
