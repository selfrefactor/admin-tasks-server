import {trim} from 'rambdax'
import {Injectable} from '@nestjs/common'
import {FsService} from 'lib/fs'
import {bookIndexes} from '../../../lambdas/populate-speed-reader/book-indexes.json'

@Injectable()
export class SpeedReaderService {
  constructor(private fsService: FsService) {}

  async readBook<K>(id: number) {
    if (!bookIndexes[id]) return

      const content = await this.fsService.readFromData(
        `books/${bookIndexes[id]}.txt`
      )
      return content
        .split(' ')
        .map(trim)
        .map(x => x.length === 1 ? x.toUpperCase() : x)
  }
}
