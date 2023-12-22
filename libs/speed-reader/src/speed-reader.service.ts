import {trim, flatten, filter} from 'rambdax'
import {Injectable} from '@nestjs/common'
import {FsService} from 'lib/fs'
import {bookIndexes} from './book-indexes.json'

@Injectable()
export class SpeedReaderService {
  constructor(private fsService: FsService) {}

  async readBook(id: number): Promise<any> {
    if (!bookIndexes[id]) return
    const first = await this.fsService.readFromData(
      `books/${bookIndexes[id]}.txt`
    )
    const second = first
      .split(' ')
      .map(trim)
      .map(x => x.split('\n'))

    const third = flatten<string>(second).map(trim)

    let prev = undefined
    
    const result = filter((word) => {
      if(prev === word){
        return false
      }

      prev = word
      return true
    }, third)

    return result
  }
}
