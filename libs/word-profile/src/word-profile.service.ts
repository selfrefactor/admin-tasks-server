import {Injectable} from '@nestjs/common'
import {DbFsService} from 'lib/db-fs'

export interface WordProfile {
  word: string,
  related: string[],
}

@Injectable()
export class WordProfileService {
  constructor(private databaseAccess: DbFsService) {}

  async getAllWords() {
    return this.databaseAccess.getKeys('word.profile')
  }
  async getWord(word: string): Promise<WordProfile> {
    return this.databaseAccess.getItem<WordProfile>('word.profile', word)
  }
}
