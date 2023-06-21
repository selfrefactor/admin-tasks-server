import {exec} from 'helpers-fn'

export async function safeWait<T>(fn: Promise<T>): Promise<T | void> {
  try {
    const result = await fn
    return result
  } catch (err) {
    console.log(err);
    return undefined
  }
}


export async function notifyOS(message: string){
  await exec({
    cwd: __dirname,
    command: `notify-send '${message}' --icon=dialog-information`
  })
}