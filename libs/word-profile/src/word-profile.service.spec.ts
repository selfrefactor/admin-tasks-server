import { Test, TestingModule } from '@nestjs/testing';
import { WordProfileService } from './word-profile.service';
import { DbFsService } from 'lib/db-fs';

describe('WordProfileService', () => {
  let service: WordProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordProfileService, DbFsService],
    }).compile();

    service = module.get<WordProfileService>(WordProfileService);
  });

  it('should be defined', async () => {
    const allWords = service.getAllWords()
    expect(allWords).toBeTruthy()
  });
});
