import {CatController} from './cat.controller'
import {Module} from '@nestjs/common'
import {getMongoUrl} from 'lib/constants'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {MongooseModule} from '@nestjs/mongoose'
import {WordProfileModule} from './word-profile/word-profile.module'

@Module({
  imports: [MongooseModule.forRoot(getMongoUrl()), WordProfileModule],
  controllers: [CatController, AppController],
  providers: [AppService],
})
export class AppModule {}
