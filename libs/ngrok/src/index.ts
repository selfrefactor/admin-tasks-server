import * as ngrokLib from 'ngrok'
import {DEFAULT_PORT} from 'lib/constants'

export const ngrok = async(port = DEFAULT_PORT) => {
  const token = process.env.NGROK_TOKEN
  if (!token) return console.log('!token', token)

  const url = await ngrokLib.connect({
    // proto: 'http',
    addr: port,
    subdomain: 'toteff',
    authtoken: token,
    region: 'eu',
    onStatusChange: status => {
      console.log({status, label: 'ngrok'})
    },
    // onLogEvent: data => {
    //   console.log({data})
    // },
  })
  console.log(url)
}
