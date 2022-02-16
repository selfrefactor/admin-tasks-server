import { AudioContext } from 'web-audio-api'
const context = new AudioContext()

context.outStream = process.stdout
