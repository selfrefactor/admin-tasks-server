import { Module } from '@nestjs/common';
import { WordProfileService } from './word-profile.service';
import { FsDbService } from '../../fs-db/src/fs-db.service';
import { DbFsService } from 'libs/db-fs/src';

@Module({
  imports: [],
  providers: [WordProfileService, FsDbService, DbFsService],
  exports: [WordProfileService],
})
export class WordProfileModule {}