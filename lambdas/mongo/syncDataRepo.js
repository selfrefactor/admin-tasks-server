import { log } from 'helpers-fn'
import { resolve } from 'path'

import { execBee } from './exec'

const CLEAN_PULL = 'Already up to date.\n'
const CLEAN_STATUS = 'nothing to commit, working tree clean'

export async function syncDataRepo(){
  const commandBase = { cwd : resolve(__dirname, '../../data') }
  const gitPull = {
    ...commandBase,
    command : 'git pull',
  }

  const gitStatus = {
    ...commandBase,
    command : 'git status',
  }
  const gitAdd = {
    ...commandBase,
    command : 'git add . --all',
  }
  const gitCommit = {
    ...commandBase,
    command : 'git commit -m "feat@data"',
  }
  const gitPush = {
    ...commandBase,
    command : 'git push',
  }
  const [ gitPullResult ] = await execBee(gitPull)
  if (gitPullResult !== CLEAN_PULL){
    log('git pull', 'warning')
  }

  const [ gitStatusResult ] = await execBee(gitStatus)
  if (gitStatusResult.includes(CLEAN_STATUS)){
    return log('git status is clean', 'info')
  }

  await execBee(gitAdd)
  await execBee(gitCommit)
  await execBee(gitPush)

  log('git pushed', 'success')
}
