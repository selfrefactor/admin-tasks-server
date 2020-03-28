import {Module} from '@nestjs/common'
import {DbFsService} from './db-fs.service'

@Module({
  providers: [DbFsService],
  exports: [DbFsService],
})
export class DbFsModule {}
