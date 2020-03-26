import { Injectable } from '@nestjs/common';
import { FsDbService } from '../../fs-db/src/fs-db.service';

@Injectable()
export class WordProfileService {
  constructor(private bar: FsDbService){}
  foo(){
    return 2
  }
}
