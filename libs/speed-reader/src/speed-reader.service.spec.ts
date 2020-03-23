import {Test, TestingModule} from '@nestjs/testing'
import {SpeedReaderService} from './speed-reader.service'
import {FsService} from 'lib/fs'

describe('SpeedReaderService', () => {
  let service: SpeedReaderService

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeedReaderService, FsService],
    }).compile()

    service = module.get<SpeedReaderService>(SpeedReaderService)
  })

  test('read book', async() => {
    const result = await service.readBook(1)
    expect(result[11]).toBe('безграничните')
    expect(result[12]).toBe('способности')
    expect(result.length).toBe(67400)
  })

  test('read book - fail', async() => {
    const result = await service.readBook('foo')
    expect(result).toBe('')
  })
})
