import * as extractZip from 'extract-zip'
import {resolve} from 'path'
import {scanFolder} from 'helpers-fn'

export async function populateSpeedReader() {
  try {
    const assetsDir = `${__dirname}/assets`
    const allZips = await scanFolder({
      folder: assetsDir,
    })
  } catch (error) {
    console.log(error)
  }
}
