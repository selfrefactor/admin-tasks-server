export const REPO_LOCATION = `${process.env.HOME}/repos`
export const DATA_LOCATION = `${REPO_LOCATION}/data`
export const DEFAULT_PORT = 4042
export const DEV_PORT = 8087
const WORK_NGROK_PORT = 3000
export const NGROK_PORT = process.env.WORK === 'ON' ? WORK_NGROK_PORT : DEFAULT_PORT
export const IS_WALLABY = process.env.WALLABY_PRODUCTION !== undefined
