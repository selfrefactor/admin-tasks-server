import * as ngrokLib from 'ngrok'
import axios from 'axios'
import {notifyOS} from 'lib/utils'

async function checkAvailable() {
  try {
    const {status} = await axios.get('https://toteff.eu.ngrok.io/')
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

  const url = await ngrokLib.connect({
    addr: port,
    subdomain: 'toteff',
    authtoken: token,
    region: 'eu',
    onStatusChange: status => {
      notifyOS(`NGROK connected at port "${port}"`)
    },
  })
  console.log(url)
}
