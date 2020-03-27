import { Injectable } from '@nestjs/common';
import { init, loadJson, loadKeys } from 'db-fn'
import { DATA_LOCATION } from 'lib/constants';

type AllowedLabels = 'word.profile' | 'translations' | 'i.learn.smarter'

export const wordNotFound = word => `Such word '${word}' is not found`

@Injectable()
export class DbFsService {
  constructor(){
    init(DATA_LOCATION)
  }
  async getKeys(label: AllowedLabels){
    return loadKeys(label)
  }
  wordProfile(){
    return {
      getAllWords: async () => this.getKeys('word.profile'),
      getWord: async (word: string) => {
        const maybeResult = await loadJson('word.profile', word)
        if(!maybeResult) throw new Error(wordNotFound(word))
        return maybeResult
      }
    }
  }
}
