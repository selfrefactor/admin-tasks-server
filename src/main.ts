import {envFn} from 'env-fn'
envFn('special')
import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {DEFAULT_PORT} from 'lib/constants'
import {ValidationPipe} from '@nestjs/common';

const PORT =
  process.env.PORT === undefined ? DEFAULT_PORT : Number(process.env.PORT)

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT)
}
bootstrap()
