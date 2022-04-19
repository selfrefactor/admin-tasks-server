process.env.HEADLESS = 'OFF'

import { scrape } from './scrape'
jest.setTimeout(3 * 60 * 1000)
test.only('happy', async () => {
  const result = await scrape(`https://www.zdnet.de/88399391/betriebsunterbrechungen-vermeiden/`, 'zdnet')
  expect(
    result
  ).toMatchSnapshot()
})
