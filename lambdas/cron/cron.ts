import {ok, delay, range, setter, getter} from 'rambdax'
import {runEveryTick} from './runEveryTick'
import {log} from 'helpers'

const LOCK_KEY = 'LOCK_KEY'

export async function cron(everyMinutes = 1) {
  try {
    const tickInput = process.env.CRON === undefined ? everyMinutes : Number(process.env.CRON)
    const tick = Math.floor(tickInput * 60000)

    ok(tick)(Number)
    setter(LOCK_KEY, false)
    for (const i of range(0, 1000)) {
      runEveryTick(LOCK_KEY)
      log(`${i} | ${tickInput * i} minutes since start`, 'back')
      await delay(tick)

      if (getter(LOCK_KEY)) {
        log('runEveryTick is too slow for such interval', 'error')
        log(`SKIP loop - ${i}`, 'warning')
      }
    }
  } catch (e) {
    console.log(e, 'from cron')
  }
}
