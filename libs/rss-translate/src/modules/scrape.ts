type ScrapeMode = 'zdnet'
import {playwrightRun} from 'playwright-wrap'

const scrapeFn = async _ => {
  const els = await _.page.$$('#articleContent > p')
  return els
    .filter(el => !el.innerHTML.includes('<strong>'))
    .map(x => x.textContent.trim())
    .join(' ')
}

export async function scrape(url: string, mode: ScrapeMode) {
  return playwrightRun({url, fn: scrapeFn, fallback: null})
}
