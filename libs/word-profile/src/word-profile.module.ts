import { Module } from '@nestjs/common';
import { WordProfileService } from './word-profile.service';
import { FsDbService } from '../../fs-db/src/fs-db.service';

@Module({
  imports: [],
  providers: [WordProfileService, FsDbService],
  exports: [WordProfileService],
})
export class WordProfileModule {}