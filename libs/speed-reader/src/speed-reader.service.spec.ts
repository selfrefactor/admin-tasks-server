import { Test, TestingModule } from '@nestjs/testing';
import { SpeedReaderService } from './speed-reader.service';
import { FsService } from 'lib/fs';

describe('SpeedReaderService', () => {
  let service: SpeedReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeedReaderService, FsService],
    }).compile();

    service = module.get<SpeedReaderService>(SpeedReaderService);
  });

  it('read book', async () => {
    const result = await service.readBook(1)
    expect(result.length).toBeGreaterThan(1999)
  });
});
