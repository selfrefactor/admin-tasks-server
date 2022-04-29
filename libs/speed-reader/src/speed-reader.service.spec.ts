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
    const result = await service.readBook(11)
    expect(
      result
    ).toMatchSnapshot() 
  })

  test('read book - fail', async() => {
    const result = await service.readBook(55)
    expect(result).toBeUndefined()
  })

  test('read book - demo', async() => {
    const result = await service.readBook(99)
    expect(result.length).toBe(7)
  })
})
