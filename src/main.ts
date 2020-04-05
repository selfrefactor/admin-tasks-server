import {envFn} from 'env-fn'
envFn('special')
import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {cron} from '../lambdas/cron/cron'
import {ngrok} from 'lib/ngrok'
import {DEFAULT_PORT} from 'lib/constants'

const PORT =
  process.env.PORT === undefined ? DEFAULT_PORT : Number(process.env.PORT)
const DEV_MODE = process.env.DEV_MODE === 'ON'

async function bootstrap() {
  if (!DEV_MODE) {
    ngrok()
    cron()
  }
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  await app.listen(PORT, '0.0.0.0')
}
bootstrap()
