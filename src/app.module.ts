import {Module} from '@nestjs/common'
import {getMongoUrl} from 'lib/constants'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {MongooseModule} from '@nestjs/mongoose'
import {WordProfileModule} from './word-profile/word-profile.module'

// const mongoFlag = process.env.MONGO_ON === 'ON'
const mongoFlag = process.env.MONGO_ON !== 'OFF'

const importsStatements = mongoFlag
  ? [MongooseModule.forRoot(getMongoUrl()), WordProfileModule]
  : []

@Module({
  imports: importsStatements,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
