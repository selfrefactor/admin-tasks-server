import {Module, MiddlewareConsumer} from '@nestjs/common'
import {AppController} from './app.controller'
import {LambdasController} from './lambdas/lambdas.controller'
import {SpeedReaderService} from 'lib/speed-reader'
import {FsService} from 'lib/fs'
import {WordProfileService} from 'lib/word-profile'
import {AuthMiddleware} from 'libs/utils/auth.middleware'
import {DbFsService} from 'lib/db-fs'
import {CorsController} from './cors/cors.controller'
import { ServeStaticModule } from '@nestjs/serve-static';

const providers = [
  SpeedReaderService,
  FsService,
  WordProfileService,
  DbFsService,
]

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `/home/sr/repos/secret-services/packages/bot-teacher/client/dist`,
      serveRoot: ''
    })
  ],
  providers,
  controllers: [AppController, LambdasController, CorsController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('lambdas')
    consumer.apply(AuthMiddleware).forRoutes('')
  }
}
