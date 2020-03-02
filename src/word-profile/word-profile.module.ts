import {Module} from '@nestjs/common'
import {WordProfileController} from './word-profile.controller'
import {WordProfileService} from './word-profile.service'
import {MongooseModule} from '@nestjs/mongoose'
import {WordProfileSchema} from '../schemas';

@Module({
  imports: [MongooseModule.forFeature([{name: 'WordProfile', schema: WordProfileSchema}])],
  controllers: [WordProfileController],
  providers: [WordProfileService],
})
export class WordProfileModule {};
