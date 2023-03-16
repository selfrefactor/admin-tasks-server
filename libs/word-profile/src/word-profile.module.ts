import {Module} from '@nestjs/common'
import {WordProfileService} from './word-profile.service'
import {DbFsService} from 'lib/db-fs'

@Module({
  imports: [],
  providers: [WordProfileService, DbFsService],
  exports: [WordProfileService],
})
export class WordProfileModule {}
