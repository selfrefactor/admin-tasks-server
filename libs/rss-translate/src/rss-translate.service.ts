import {Injectable} from '@nestjs/common'
import * as Parser from 'rss-parser';
import {DbFsService, itemNotFound} from 'lib/db-fs'

const parser = new Parser({})

@Injectable()
export class RssTranslateService {
  constructor(private databaseAccess: DbFsService) {}

  async foo(url) {
    let voo = await this.databaseAccess.getKeys('word.profile')
    console.log(voo)
    return 1
  }
  async read(url) {
    this.databaseAccess
    const feed = await parser.parseURL(url);
    return feed.items.map(x => {
      const [content] = x.link.split('?utm_source')
      return content
    })
  }
}
