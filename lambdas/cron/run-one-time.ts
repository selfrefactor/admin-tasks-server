import * as sudo from 'sudo-prompt'
import {exec as execModule} from 'child_process'
import {log} from 'helpers-fn'

function execBee(input: any): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const willReturn: string[] = []
    const execCommand: any = execModule(input.command, {cwd: input.cwd})

    execCommand.stdout.on('data', (chunk: any) => {
      willReturn.push(chunk.toString('utf8'))
    })
    execCommand.stdout.on('end', () => resolve(willReturn))
    execCommand.stdout.on('error', (err: any) => reject(err))
  })
}

const options = {
  name: 'Fix VSCode watchers',
}

export async function runOneTime() {
  const [currentWatchers] = await execBee({
    command: 'cat /proc/sys/fs/inotify/max_user_watches',
    cwd: __dirname,
  })

  if (currentWatchers.trim() === '524288') {
    return log('no need to reload sysctl', 'info')
  }
  sudo.exec('sysctl -p', options, function(error: any, stdout: any) {
    if (error) throw error
    console.log('stdout: ' + stdout)
  })
}
