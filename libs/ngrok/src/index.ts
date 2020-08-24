import * as ngrokLib from 'ngrok'
import axios from 'axios'
import {notifyOS} from 'lib/utils'

async function checkAvailable(isDefaultPort) {
  try {
    const addressToCheck = isDefaultPort ? 'https://toteff.eu.ngrok.io/' : 'https://toteff.ngrok.io/'
    const {status} = await axios.get(addressToCheck)
    return status === 200
  } catch (error) {
    return false
  }
}

export const ngrok = async(port, isDefaultPort) => {
  const token = process.env.NGROK_TOKEN
  if (!token) return console.log('!token', token)
  const alreadyUp = await checkAvailable(isDefaultPort)

  if (alreadyUp) {
    return console.log('Already running in other instance or computer')
  }

  const url = await ngrokLib.connect({
    ...(isDefaultPort ? {region:'eu'}: {}),
    addr: port,
    subdomain: 'toteff',
    authtoken: token,
    onStatusChange: status => {
      notifyOS(`NGROK connected at port "${port}"`)
    },
  })
  console.log(url)
}
