import {ok, delay, range, setter, getter} from 'rambdax'
import {runEveryTick} from './run-every-tick'
import {runOneTime} from './run-one-time'
import {log} from 'helpers-fn'

const LOCK_KEY = 'LOCK_KEY'
const fallbackEveryMinutes = 1

export async function cron(devMode: boolean) {
  try {
    runOneTime()
    if (devMode) return

    const tickInput =
      process.env.CRON === undefined
        ? fallbackEveryMinutes
        : Number(process.env.CRON)
    const tick = Math.floor(tickInput * 60000)

    ok(tick)(Number)
    setter(LOCK_KEY, false)
    for (const i of range(0, 1000)) {
      runEveryTick(LOCK_KEY)
      log(`${tickInput * i} minutes since start`, 'back')
      await delay(tick)

      if (getter(LOCK_KEY)) {
        log(`runEveryTick is too slow for such interval ${tick}`, 'error')
        log(`SKIP loop - ${i}`, 'warning')
      }
    }
  } catch (e) {
    console.log(e, 'from cron')
  }
}
