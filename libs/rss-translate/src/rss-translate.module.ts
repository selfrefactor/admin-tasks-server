import { Module } from '@nestjs/common';
import { RssTranslateService } from './rss-translate.service';
import { DbFsService } from '../../db-fs/src/db-fs.service';

@Module({
  providers: [RssTranslateService, DbFsService],
  exports: [RssTranslateService],
})
export class RssTranslateModule {}
