import {Injectable} from '@nestjs/common'
import * as Parser from 'rss-parser';

const parser = new Parser({})

@Injectable()
export class RssTranslateService {
  async read(url) {
    const feed = await parser.parseURL(url);
    return feed.items.map(x => {
      const [content] = x.link.split('?utm_source')
      return content
    })
  }
}
