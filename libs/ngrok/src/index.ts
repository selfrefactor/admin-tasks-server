import * as ngrokLib from 'ngrok'
import axios from 'axios'
import { log } from 'helpers-fn'

async function checkAvailable() {
  try {
    const addressToCheck = 'https://toteff.eu.ngrok.io/'

    const {status} = await axios.get(addressToCheck)
    return status === 200
  } catch (error) {
    return false
  }
}

export const ngrok = async(port) => {
  const token = process.env.NGROK_TOKEN
  if (!token) return console.log('!token', token)
  const alreadyUp = await checkAvailable()

  if (alreadyUp) {
    return console.log('Already running in other instance or computer')
  }

  await ngrokLib.connect({
    region:'eu',
    addr: port,
    subdomain: 'toteff',
    authtoken: token,
    onStatusChange: status => {
      log(`NGROK connected at port "${port}"`, 'info')
    },
  })
}
