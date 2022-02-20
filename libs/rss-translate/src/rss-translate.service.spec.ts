import { Test, TestingModule } from '@nestjs/testing';
import { RssTranslateService } from './rss-translate.service';

describe('RssTranslateService', () => {
  let service: RssTranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RssTranslateService],
    }).compile();

    service = module.get<RssTranslateService>(RssTranslateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  
  it.skip('read', async () => {
    const result = await service.read(`https://t3n.de/tag/rss/rss.xml`)
    expect(
      result
    ).toMatchSnapshot()
  });
})
;
