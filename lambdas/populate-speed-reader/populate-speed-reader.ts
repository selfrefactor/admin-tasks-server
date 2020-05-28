import * as extractZip from 'extract-zip'
import {parse, resolve} from 'path'
import {scanFolder} from 'helpers-fn'
import { move } from 'fs-extra'
import {
  endsWith,
  init,
  mapAsync,
  match,
  ok,
  piped,
  remove,
  replace,
  test,
  toLower,
} from 'rambdax'

const extractDir = `${__dirname}/extracted`

const destinationDir = resolve(
  __dirname,
  '../../../data/books'
)

export function generateFileName(filePath){
  const matched = match(
    /assets\/[a-zA-Z_\.]+-[a-zA-Z_\.]+/
  )(filePath)

  if(matched.length === 0) throw new Error('either file path or regex is wrong')

  const result = piped<string>(
    matched[0],
    remove(
      ['assets/', 'b.txt.zip']
    ),
    replace('_-_','.'),
    replace(/_/g,'.'),
    replace(/\.\./g,'.'),
    x => x.endsWith('.') ? init(x) : x,
    toLower
  )

  const okResult = test(
    /^[a-z\.]+$/
  )(result)

  ok(okResult)(true)

  return result    
}

async function processSingleZip(zipFilePath){
  await extractZip(zipFilePath, { dir: extractDir })
  const fileName = generateFileName(zipFilePath)
  const {name: originFileName} = parse(zipFilePath)
  
  const fullPath = `${extractDir}/${originFileName}`

  await move(
    fullPath,
    `${destinationDir}/${fileName}.txt`,
    {overwrite: true}
  )

  return {fileName, fullPath}
}

export async function populateSpeedReader() {
  try {
    const assetsDir = `${__dirname}/assets`
    const allZips = await scanFolder({
      folder: assetsDir,
      filterFn: endsWith('.zip')
    }) 

    await mapAsync(processSingleZip)(allZips)
  } catch (error) {
    console.log(error, 'populate.speed.reader')
  }
}
 