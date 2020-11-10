import {ok, delay, range} from 'rambdax'
import {niketaTheme} from '../niketa-theme/niketaTheme'
import {log} from 'helpers-fn'

const fallbackEveryMinutes = 1

const tickInput =
  process.env.CRON === undefined
    ? fallbackEveryMinutes
    : Number(process.env.CRON)

const tick = Math.floor(tickInput * 60000)

export async function cron(devMode: boolean) {
  if (devMode) return log('skip cron','info')

  ok(tick)(Number)
  for (const i of range(0, 1000)) {
    niketaTheme()
    log(`${tickInput * i} minutes since start`, 'back')
    await delay(tick)
  }
}
