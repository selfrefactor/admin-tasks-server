import { Injectable } from '@nestjs/common';
import { init, loadJson, loadKeys } from 'db-fn'
import { DATA_LOCATION } from 'lib/constants';

type AllowedLabels = 'word.profile' | 'translations' | 'i.learn.smarter'

@Injectable()
export class FsDbService {
  constructor(){
    init(DATA_LOCATION)
  }
  async getKeys(label: AllowedLabels){
    return loadKeys(label)
  }
}
