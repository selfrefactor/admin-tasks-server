import {log}from'helpers-fn'
export const REPO_LOCATION = `${process.env.HOME}/repos`
export const DATA_LOCATION = `${REPO_LOCATION}/data`
export const DEFAULT_PORT = 4042
 
export const getMongoUrl = () => {
  if (!process.env.MONGO_CONNECT_URL){
    log('process will exit 1', 'error')
    process.exit()
  }
  return process.env.MONGO_CONNECT_URL
}

export const getMongoConnectUrl = () => {
  if (!process.env.MONGO_CONNECT_URL_ADMIN){
    log('process will exit 2', 'error')
    process.exit()
  }  
  
  return process.env.MONGO_CONNECT_URL_ADMIN
}
