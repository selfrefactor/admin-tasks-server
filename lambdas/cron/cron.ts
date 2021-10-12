import {ok, delay, range} from 'rambdax'
import {niketaTheme} from '../niketa-theme/niketaTheme'
import {log} from 'helpers-fn'
import { killCode } from './kill-code'

const fallbackEveryMinutes = 30

const tickInput =
  process.env.NIKETA_THEME_CRON === undefined
    ? fallbackEveryMinutes
    : Number(process.env.NIKETA_THEME_CRON)
    
console.log(tickInput, 'NIKETA_THEME_CRON')
const tick = Math.floor(tickInput * 60000)

export async function cron(devMode: boolean) {
  if (devMode) return log('skip cron','info')

  ok(tick)(Number)
  for (const i of range(0, 1000)) {
    niketaTheme()
    killCode()
    log(`${tickInput * i} minutes since start`, 'back')
    await delay(tick)
  }
}
