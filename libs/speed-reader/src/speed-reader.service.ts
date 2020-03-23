import { Injectable } from '@nestjs/common';
import { FsService } from 'lib/fs';

const hash = {
  0    : 'udhaus_fred',
  1    : 'udhaus_napred',
  2    : 'udhaus_pari',
  3    : 'udhaus_pylnolunie',
  4    : 'udhaus_radost',
  5    : 'udi',
  6    : 'voltaire',
  7    : 'sunset',
  8    : 'too_human',
  9    : 'zaratustra',
  demo : 'demo',
}
 
@Injectable()
export class SpeedReaderService {
  constructor(private fsService: FsService) {}

  async readBook<K>(id: string|number){
    if(!hash[id]) return ''

    try {
      return this.fsService.readFromData(
        `books/${hash[id]}.txt`
      )
    } catch (e) {
      console.log(e,'read.book')
      return ''  
    }
  }
}
