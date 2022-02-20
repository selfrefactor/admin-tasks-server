import {Injectable} from '@nestjs/common'
import {parse} from 'rss-to-json'

@Injectable()
export class RssTranslateService {
  async read(url) {
    console.log(parse ,1)
    const rss = await (parse as any)(url)
    console.log(rss)
    // return JSON.stringify(rss, null, 2)
  }
}
