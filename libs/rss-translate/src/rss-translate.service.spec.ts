import { Test, TestingModule } from '@nestjs/testing';
import { RssTranslateService } from './rss-translate.service';
import { DbFsService } from '../../db-fs/src/db-fs.service';

describe('RssTranslateService', () => {
  let service: RssTranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RssTranslateService, DbFsService],
    }).compile();

    service = module.get<RssTranslateService>(RssTranslateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it.skip('read 1', async () => {
    const result = await service.read(`https://www.zdnet.de/feed/`, 'zdnet')
    expect(
      result
    ).toMatchSnapshot()
  });
  it.only('scrape', async () => {
    const result = await service.scrape(`https://www.zdnet.de/88399391/betriebsunterbrechungen-vermeiden/`, 'zdnet')
console.log(`result`, result) 
  });
})
;
