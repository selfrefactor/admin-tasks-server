import {Injectable} from '@nestjs/common'
import {DbFsService} from 'lib/db-fs'
import {fn} from 'lib/utils'

export interface WordProfile {
  word: string,
  related: string[],
}

@Injectable()
export class WordProfileService {
  constructor(private databaseAccess: DbFsService) {}

  async getAllWords() {
    fn('foo')
    return this.databaseAccess.getKeys('word.profile')
  }
  async getWord(word: string): Promise<WordProfile[]> {
    return this.databaseAccess.getItem('word.profile', word)
  }
}
