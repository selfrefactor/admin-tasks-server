type ScrapeMode = 'zdnet'
import {playwrightRun} from 'playwright-wrap'
import { delay, mapAsync } from 'rambdax'

const scrapeFn = async _ => {
  await _.page.click('#didomi-notice-agree-button')
  await delay(1000)
  const els = await _.page.$$('#articleContent > p')

  const titles = []
  const paragraphs = []
  await mapAsync(async (el: any) => {
    const innerHTML = await el.innerHTML()
    if(innerHTML.includes('<strong>')){
      titles.push(await el.textContent())
    }else{
      paragraphs.push(await el.textContent())
    }
  }, Array.from(els))

  return {titles, paragraphs}
}

function handleError(e){
  e
}

export async function scrape(url: string, mode: ScrapeMode) {
  return playwrightRun({url, fn: scrapeFn, fallback: null, handleError})
}
