import { Module } from '@nestjs/common';
import { FsDbService } from './fs-db.service';

@Module({
  providers: [FsDbService],
  exports: [FsDbService],
})
export class FsDbModule {}
