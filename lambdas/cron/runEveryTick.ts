import {setter, getter} from 'rambdax'
import {log} from 'helpers'
import {niketaTheme} from '../niketa-theme/niketaTheme'
export async function runEveryTick(lockKey) {
  if (getter(lockKey)) {
    return log('Locked tick', 'error')
  }
  setter(lockKey, true)
  await niketaTheme()
  setter(lockKey, false)
}
