import {Module, MiddlewareConsumer} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {LambdasController} from './lambdas/lambdas.controller'
import {SpeedReaderService} from 'lib/speed-reader'
import {FsService} from 'lib/fs'
import {WordProfileService} from 'lib/word-profile'
import {AuthMiddleware} from 'libs/utils/auth.middleware'
import {DbFsService} from 'lib/db-fs'

const controllers = [AppController, LambdasController]

const providers = [
  AppService,
  SpeedReaderService,
  FsService,
  WordProfileService,
  DbFsService,
]

@Module({
  imports: [],
  controllers,
  providers,
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('lambdas')
  }
}
