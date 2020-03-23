import { Module } from '@nestjs/common';
import { SpeedReaderService } from './speed-reader.service';

@Module({
  providers: [SpeedReaderService],
  exports: [SpeedReaderService],
})
export class SpeedReaderModule {}
