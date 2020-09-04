import {Injectable} from '@nestjs/common'
import {readJson} from 'fs-extra'
import {resolve} from 'path'
import {existsSync} from 'fs'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Foo'
  }
  async getContiniousIntegrationStatus(): Promise<object> {
    const location = resolve(`${process.env.HOME}/work/ci/docker-data.json`)
    if(!existsSync(location)) return {error:'No docker data file'}

    return readJson(location)
  }
}
