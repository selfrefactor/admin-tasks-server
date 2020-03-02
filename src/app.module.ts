import {CatController} from './cat.controller'
import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {MongooseModule} from '@nestjs/mongoose'
import {WordProfileModule} from './word-profile/word-profile.module'

@Module({
  imports: [MongooseModule.forRoot('mongodb://0.0.0.0/wordProfile'), WordProfileModule],
  controllers: [CatController, AppController],
  providers: [AppService],
})
export class AppModule {}
