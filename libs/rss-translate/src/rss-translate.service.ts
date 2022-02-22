import {Injectable} from '@nestjs/common'
import * as Parser from 'rss-parser';
import {DbFsService} from 'lib/db-fs'
import { mapAsync } from 'rambdax';

const parser = new Parser({})

const BASE = 'rss.translate'

@Injectable()
export class RssTranslateService {
  constructor(private databaseAccess: DbFsService) {}

  async foo(url) {
    let voo = await this.databaseAccess.getKeys('word.profile')
    console.log(voo)
    return 1
  }
  async read(url, labelInput) {
    const label = `${BASE}.${labelInput}`
    const feed = await parser.parseURL(url);
    const items = feed.items.map(x => {
      const [content] = x.link.split('?utm_source')
      return content
    })
console.log(`items`, items)
    await mapAsync(async (feedItem) => {
      const key = this.databaseAccess.createKeyForUrl(feedItem)
      await this.databaseAccess.updateOrGetKey(label, key, {scraped: false})
    }, items)
  }
}
