import {Injectable} from '@nestjs/common'
import * as Parser from 'rss-parser';
import {DbFsService} from 'lib/db-fs'
import {scrape as scrapeMethod} from './modules/scrape'
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
    const urls = feed.items.map(x => {
      const [content] = x.link.split('?utm_source')
      return content
    })
    await mapAsync(async (feedItemUrl) => {
      const key = this.databaseAccess.createKeyForUrl(feedItemUrl)
      await this.databaseAccess.updateOrGetKey(label, key, {scraped: false, url: feedItemUrl}, true)
    }, urls)

    return feed.items
  }
  async scrape(url, labelInput){
    const result = await scrapeMethod(url)
    console.log(`result`, result)
    return 1
  }
}
