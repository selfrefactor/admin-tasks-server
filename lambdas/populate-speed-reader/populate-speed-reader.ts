import * as extractZip from 'extract-zip'
import {resolve} from 'path'
import {scanFolder} from 'helpers-fn'
import { endsWith } from 'rambdax'

export async function populateSpeedReader() {
  try {
    const assetsDir = `${__dirname}/assets`
    const allZips = await scanFolder({
      folder: assetsDir,
      filterFn: endsWith('.zip')
    })
    console.log(allZips)
  } catch (error) {
    console.log(error)
  }
}
 