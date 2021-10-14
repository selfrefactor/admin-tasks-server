import {ok, delay, range} from 'rambdax'
import {niketaTheme} from '../niketa-theme/niketaTheme'
import {log} from 'helpers-fn'
import { killCode, startCode } from './kill-code'
import { fixWallaby } from './fix-wallaby'

const fallbackEveryMinutes = 25

const tickInput =
  process.env.NIKETA_THEME_CRON === undefined
    ? fallbackEveryMinutes
    : Number(process.env.NIKETA_THEME_CRON)
    
console.log(tickInput, 'NIKETA_THEME_CRON minutes')
const tick = Math.floor(tickInput * 60000)

export async function cron(devMode: boolean) {
  if (devMode) return log('skip cron','info')
  await fixWallaby()
  ok(tick)(Number)
  for (const i of range(0, 1000)) {
    niketaTheme()

    if(i % 2 === 1){
      await killCode()
      await delay(5000)
      await startCode()
      log(`VSCode restarted`, 'box')
    }
    log(`${tickInput * i} minutes since start`, 'back')
    await delay(tick)
  }
}
