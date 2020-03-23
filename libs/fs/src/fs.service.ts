import { Injectable } from '@nestjs/common';
import { SpeedReaderService } from 'lib/speed-reader';

@Injectable()
export class FsService {
  constructor(private appService: SpeedReaderService) {}

  foo(){
    return 1 + this.appService.foo()
  }
}
