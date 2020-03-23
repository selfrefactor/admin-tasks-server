import { Module } from '@nestjs/common';
import { FsService } from './fs.service';
import {SpeedReaderService } from 'lib/speed-reader'

@Module({
  imports: [SpeedReaderService],
  providers: [FsService, SpeedReaderService],
  exports: [FsService],
})
export class FsModule {}
