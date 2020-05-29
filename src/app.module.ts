import {getWordProfileConnectUrl} from 'lib/constants'
import {Module, MiddlewareConsumer} from '@nestjs/common'
import {GraphQLModule} from '@nestjs/graphql'
import {MongooseModule} from '@nestjs/mongoose'
import {ItemsModule} from './items/items.module'
import {AppController} from './app.controller'
import {AppService} from './app.service'
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
  return [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    ItemsModule,
    MongooseModule.forRoot(getWordProfileConnectUrl(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ]
}

const controllers = [AppController, LambdasController]

const providers = [
  AppService,
  SpeedReaderService,
  FsService,
  WordProfileService,
  DbFsService,
]

@Module({
  imports: getImportStatements(),
  controllers,
  providers,
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('lambdas')
  }
}
