import {flatten, trim} from 'rambdax'
import {Injectable} from '@nestjs/common'
import {FsService} from 'lib/fs'

interface Hash {
  [key: string]: string,
}

const hash: Hash = {
  0: 'udhaus_fred',
  1: 'udhaus_napred',
  2: 'udhaus_pari',
  3: 'udhaus_pylnolunie',
  4: 'udhaus_radost',
  5: 'udi',
  6: 'voltaire',
  7: 'sunset',
  8: 'too_human',
  9: 'zaratustra',
  10: 'gogol',
  99: 'demo',
}

@Injectable()
export class SpeedReaderService {
  constructor(private fsService: FsService) {}

  async readBook<K>(id: number) {
    if (!hash[id]) return

    try {
      const contentRaw = await this.fsService.readFromData(
        `books/${hash[id]}.txt`
      )
      const content = contentRaw
        .split(' ')
        .map(trim)
        .map(x => x.split('\n'))
      const result = flatten<string>(content).map(trim)
      return result
    } catch (e) {
      console.log(e, 'read.book')
      return
    }
  }
}
