import { Test, TestingModule } from '@nestjs/testing';
import { SpeedReaderService } from './speed-reader.service';

describe('SpeedReaderService', () => {
  let service: SpeedReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeedReaderService],
    }).compile();

    service = module.get<SpeedReaderService>(SpeedReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(service.foo()).toBe(1);
  });
});
