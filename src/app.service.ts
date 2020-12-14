import {Injectable} from '@nestjs/common'
import {readJson} from 'fs-extra'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Foo'
  }
}
