import { Injectable } from '@nestjs/common';
import { DbFsService } from 'lib/db-fs';

@Injectable()
export class WordProfileService {
  constructor(private bar: DbFsService){}
  foo(){
    return 2 + this.bar.bar()
  }
}
