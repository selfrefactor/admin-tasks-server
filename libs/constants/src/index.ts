export const REPO_FOLDER = `${process.env.HOME}/repos`
export const DATA_FOLDER = `${REPO_FOLDER}/data`
export const DEFAULT_PORT = 4042
export const MONGO_URL = process.env.MONGO_CONNECT_URL
export const MONGO_ATLAS_CONNECT = process.env.MONGO_ATLAS_CONNECT

export const getMongoUrl = () => {
  if (!MONGO_URL) process.exit()
  return MONGO_URL
}

export const getMongoConnectUrl = () => {
  if (!MONGO_ATLAS_CONNECT) process.exit()
  return MONGO_ATLAS_CONNECT
}
