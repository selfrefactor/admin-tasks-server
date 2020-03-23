import { Test, TestingModule } from '@nestjs/testing';
import { FsService } from './fs.service';
import { SpeedReaderService } from 'lib/speed-reader';

describe('FsService', () => {
  let service: FsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FsService, SpeedReaderService],
    }).compile();

    service = module.get<FsService>(FsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(service.foo()).toBe(2)
  });
});
