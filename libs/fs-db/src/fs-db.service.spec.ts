import { Test, TestingModule } from '@nestjs/testing';
import { FsDbService } from './fs-db.service';

describe('FsDbService', () => {
  let service: FsDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FsDbService],
    }).compile();

    service = module.get<FsDbService>(FsDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('load keys', async () => {
    const result = service.getKeys('word.profile')
    console.log(result)
  });
});
