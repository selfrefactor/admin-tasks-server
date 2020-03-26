import { Test, TestingModule } from '@nestjs/testing';
import { WordProfileService } from './word-profile.service';
import { FsDbService } from '../../fs-db/src/fs-db.service';

describe('WordProfileService', () => {
  let service: WordProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordProfileService, FsDbService],
    }).compile();

    service = module.get<WordProfileService>(WordProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
