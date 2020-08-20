import {log} from 'helpers-fn'
export const REPO_LOCATION = `${process.env.HOME}/repos`
export const DATA_LOCATION = `${REPO_LOCATION}/data`
export const DEFAULT_PORT = 4042
const WORK_NGROK_PORT = 3000
export const NGROK_PORT = process.env.WORK === 'ON' ? WORK_NGROK_PORT : DEFAULT_PORT
export const IS_WALLABY = process.env.WALLABY_PRODUCTION !== undefined

export const getMongoUrl = () => {
  if (!process.env.MONGO_CONNECT_URL) {
    log('process will exit', 'error')
    process.exit()
  }
  return process.env.MONGO_CONNECT_URL
}

export const getMongoConnectUrl = () => {
  if (!process.env.MONGO_CONNECT_URL_ADMIN) {
    log('process will exit', 'error')
    process.exit()
  }

  return process.env.MONGO_CONNECT_URL_ADMIN
}

export const getWordProfileConnectUrl = () => {
  if (!process.env.WORD_PROFILE_MONGO_CONNECT_URL) {
    log('process will exit', 'error')
    process.exit()
  }

  return process.env.WORD_PROFILE_MONGO_CONNECT_URL
}
