import { Module } from '@nestjs/common';
import { SpeedReaderService } from './speed-reader.service';
import { FsService } from 'lib/fs';

@Module({
  providers: [SpeedReaderService, FsService],
  exports: [SpeedReaderService],
})
export class SpeedReaderModule {}
