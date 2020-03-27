import { Injectable } from '@nestjs/common';
import { init, loadJson, loadKeys } from 'db-fn'
import { DATA_LOCATION } from 'lib/constants';

type AllowedLabels = 'word.profile' | 'translations' | 'i.learn.smarter'

export const itemNotFound = id => `Such item with id '${id}' was not found`

@Injectable()
export class DbFsService {
  constructor(){
    init(DATA_LOCATION)
  }
  async getKeys(label: AllowedLabels){
    return loadKeys(label)
  }
  async getItem(label: AllowedLabels, id: string){
    const maybeResult = await loadJson('word.profile', id)
    if(!maybeResult) throw new Error(itemNotFound(id))
    return loadJson(label, id)
  }
}
