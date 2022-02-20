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

  it('read', async () => {
    // const result = await service.read(`https://t3n.de/tag/rss/rss.xml`)
    const result = await service.read(`'https://blog.ethereum.org/feed.xml'`)
    console.log(`result`, result)
  });
})
;
