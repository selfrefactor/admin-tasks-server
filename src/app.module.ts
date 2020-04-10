import {Module, MiddlewareConsumer} from '@nestjs/common'
import {getMongoConnectUrl} from 'lib/constants'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {ConfigModule} from '@nestjs/config'
import {WordProfile} from './word-profile/word-profile.entity'
import {WordProfileController} from './word-profile/word-profile.controller'
import {LambdasController} from './lambdas/lambdas.controller'
import {SpeedReaderService} from 'lib/speed-reader'
import {FsService} from 'lib/fs'
import {WordProfileService} from 'lib/word-profile'
import {AuthMiddleware} from 'libs/utils/auth.middleware'
import {DbFsService} from 'lib/db-fs'
// const mongoFlag = process.env.MONGO_ON === 'ON'
const mongoFlag = process.env.MONGO_ON !== 'OFF'

const getImportStatements = () => {
  if (!mongoFlag) return []
  const typeOrm = TypeOrmModule.forRoot({
    type: 'mongodb',
    url: getMongoConnectUrl(),
    database: 'word-profile',
    entities: [WordProfile],
    ssl: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  return [
    ConfigModule.forRoot(),
    typeOrm,
    TypeOrmModule.forFeature([WordProfile]),
  ]
}

const baseControllers = [AppController, LambdasController]
const controllers = mongoFlag
  ? [...baseControllers, WordProfileController]
  : baseControllers

@Module({
  imports: getImportStatements(),
  controllers,
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
