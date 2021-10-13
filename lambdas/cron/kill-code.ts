import * as sudo from 'sudo-prompt'
import { exec } from 'helpers-fn';

const options = {
  name: 'Kill VSCode',
}

export async function startCode(){
  await exec({
    cwd: __dirname,
    command: `code`
  })
}

export function killCode() {
  return new Promise((resolve, reject)=> {
    sudo.exec('pkill -9 code', options, function(error: any, stdout: any) {
      if (error){
        return reject(error)
      }
      console.log('killCode stdout: ' + stdout)
      resolve(null)
    })
  })
}
