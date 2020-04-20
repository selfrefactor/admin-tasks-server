import {Module, MiddlewareConsumer} from '@nestjs/common'
import {getMongoConnectUrl} from 'lib/constants'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {ConfigModule} from '@nestjs/config'
import {LambdasController} from './lambdas/lambdas.controller'
import {SpeedReaderService} from 'lib/speed-reader'
import {FsService} from 'lib/fs'
import {WordProfileService} from 'lib/word-profile'
import {AuthMiddleware} from 'libs/utils/auth.middleware'
import {DbFsService} from 'lib/db-fs'
// const mongoFlag = process.env.MONGO_ON === 'ON'
const mongoFlag = process.env.MONGO_ON !== 'OFF'

// const getImportStatements = () => {
//   if (!mongoFlag) return []
//   return [
//     ConfigModule.forRoot(),
//   ]
// }

const baseControllers = [AppController, LambdasController]
// const controllers = mongoFlag
//   ? [...baseControllers]
//   : baseControllers

@Module({
  imports: [],
  controllers: baseControllers,
  providers: [
    AppService,
    SpeedReaderService,
    FsService,
    WordProfileService,
    DbFsService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('lambdas')
  }
}
