import {Test, TestingModule} from '@nestjs/testing'
import {DbFsService} from './db-fs.service'

describe('DbFsService', () => {
  let service: DbFsService

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbFsService],
    }).compile()

    service = module.get<DbFsService>(DbFsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  it('should be defined', () => {
    const url = 'https://t3n.de/news/slack-messenger-25-tipps-tricks-661440/'
    const result = service.createKeyForUrl(url)
    console.log(result)
  })
})
