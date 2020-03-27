import {setter, getter} from 'rambdax'
import {log} from 'helpers-fn'
import {niketaTheme} from '../niketa-theme/niketaTheme'

export async function runEveryTick(lockKey: string) {
  if (getter(lockKey)) {
    return log('Locked tick', 'error')
  }
  setter(lockKey, true)
  await niketaTheme()
  setter(lockKey, false)
}
