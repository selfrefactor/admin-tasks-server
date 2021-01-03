import {trim, flatten} from 'rambdax'
import {Injectable} from '@nestjs/common'
import {FsService} from 'lib/fs'
import {bookIndexes} from '../../../lambdas/populate-speed-reader/book-indexes.json'

@Injectable()
export class SpeedReaderService {
  constructor(private fsService: FsService) {}

  async readBook<K>(id: number) {
    if (!bookIndexes[id]) return
      const contentRaw = await this.fsService.readFromData(
        `books/${bookIndexes[id]}.txt`
      )
      const content = 
        contentRaw.split(' ')
        .map(trim)
        .map(x => x.split('\n'))

        return flatten<string>(content).map(trim)
        .map(x => x.length === 1 ? `${x.toUpperCase() }` : x)
  }
}
