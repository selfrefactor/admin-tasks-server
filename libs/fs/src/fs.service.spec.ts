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

  test('read from data folder', async () => {
    const result = await service.readFromData('books/demo.txt')
    expect(result.length).toBeGreaterThan(11)
  });
  test('read from data folder - fail', async () => {
    await expect(
      service.readFromData('books/foo.txt')
    ).rejects.toThrow();
  });
});
