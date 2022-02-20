import { Module } from '@nestjs/common';
import { RssTranslateService } from './rss-translate.service';

@Module({
  providers: [RssTranslateService, DbFsService],
  exports: [RssTranslateService],
})
export class RssTranslateModule {}
