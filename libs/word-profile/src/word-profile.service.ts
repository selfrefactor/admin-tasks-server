import { Injectable } from '@nestjs/common';
import { DbFsService } from 'lib/db-fs';

@Injectable()
export class WordProfileService {
  constructor(private databaseAccess: DbFsService){}

  async getAllWords(){
    return this.databaseAccess.getKeys(
      'word.profile'
    )
  }
}
