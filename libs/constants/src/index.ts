export const DEFAULT_PORT = 4042
export const MONGO_URL = process.env.MONGO_CONNECT_URL

export const getMongoUrl = () => {
  if(!MONGO_URL) process.exit()
  return MONGO_URL
}