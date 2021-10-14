import { existsSync } from 'fs';
import { outputJson, readJson } from 'fs-extra';
import { exec } from 'helpers-fn';

const fixedProperty = {
  "wallaby": {
    "autoDetect": true,
    "runMode": "onsave",
    "workers": {
      "initial": 1,
      "regular": 1
    }
  }
}

export async function startCode(){
  await exec({
    cwd: __dirname,
    command: `code`
  })
}

export async function fixWallaby() {
  const outputFilePath = `${process.env.HOME}/work/dms-ui/package.json`

  if(!existsSync(outputFilePath)) return

  const currentState = await readJson(outputFilePath)

  const newState = {
    ...currentState,
    ...fixedProperty
  }

  await outputJson(outputFilePath, newState, {spaces:2})
}
