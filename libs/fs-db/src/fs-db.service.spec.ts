import { Test, TestingModule } from '@nestjs/testing';
import { FsDbService, wordNotFound } from './fs-db.service';

describe('FsDbService', () => {
  let service: FsDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FsDbService],
    }).compile();

    service = module.get<FsDbService>(FsDbService);
  });

  it('WORD_PROFILE - get single word - happy', async () => {
    const singleWord = await service.wordProfile().getWord(
      'abbringen'
    )
    singleWord
  });

  it('WORD_PROFILE - get single word - fail', async () => {
    await expect(
      service.wordProfile().getWord(
        'foo'
      )
    ).rejects.toThrow(
      wordNotFound('foo')
    );
  });

  it('WORD_PROFILE - get all words', async () => {
    const allWords = await service.wordProfile().getAllWords()
    expect(allWords.length).toBeGreaterThan(100)
  });
  
  it('load keys', async () => {
    const result = await service.getKeys('word.profile')
    expect(result.length).toBeGreaterThan(100)
  });

        it('should be defined', () => {
          expect(service).toBeDefined();
        });
});
