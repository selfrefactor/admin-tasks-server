import {populateSpeedReader} from './populate-speed-reader'
import { IS_JEST } from 'lib/constants'

test('happy', async() => {
  if(!IS_JEST) return
  await populateSpeedReader()
})
