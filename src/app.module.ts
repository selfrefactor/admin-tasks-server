import {CatController} from './cat.controller'
import {Module} from '@nestjs/common'
import {getMongoUrl} from 'lib/constants'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {MongooseModule} from '@nestjs/mongoose'
import {WordProfileModule} from './word-profile/word-profile.module'

const importsStatements =
  process.env.MONGO_ON === 'ON' ? [MongooseModule.forRoot(getMongoUrl()), WordProfileModule] : []

@Module({
  imports: importsStatements,
  controllers: [CatController, AppController],
  providers: [AppService],
})
export class AppModule {}
