import {random} from 'rambdax'
import {exec} from 'helpers-fn'

export async function safeWait<T>(fn: Promise<T>): Promise<T | void> {
  try {
    const result = await fn
    return result
  } catch (err) {
    console.log(err)
    return undefined
  }
}

export function getRandomIndexes(
  listLength: number,
  numberOfIndexes: number
) {
  if (listLength < numberOfIndexes) throw new Error('Possible while(true)')
  const toReturn: number[] = []
  while (toReturn.length < numberOfIndexes) {
    const maybeIndex = random(0, listLength - 1)
    if (!toReturn.includes(maybeIndex)) {
      toReturn.push(maybeIndex)
    }
  }

  return toReturn
}

export async function notifyOS(message: string){
  await exec({
    cwd: __dirname,
    command: `notify-send '${message}' --icon=dialog-information`
  })
}