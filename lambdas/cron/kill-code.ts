import * as sudo from 'sudo-prompt'

const options = {
  name: 'Kill VSCode',
}

export async function killCode() {
  sudo.exec('pkill -9 code', options, function(error: any, stdout: any) {
    if (error) throw error
    console.log('killCode stdout: ' + stdout)
  })
}
