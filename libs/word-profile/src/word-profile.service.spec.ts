import {Test, TestingModule} from '@nestjs/testing'
import {WordProfileService} from './word-profile.service'
import {DbFsService, itemNotFound} from 'lib/db-fs'

describe('WordProfileService', () => {
  let service: WordProfileService

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordProfileService, DbFsService],
    }).compile()

    service = module.get<WordProfileService>(WordProfileService)
  })

  it('should be defined', async() => {
    const allWords = service.getAllWords()
    expect(allWords).toBeTruthy()
  })

  it('WORD_PROFILE - get single word - happy', async() => {
    const singleWord = await service.getWord('abbringen')
    expect(singleWord).toBeTruthy()
  })

  it('WORD_PROFILE - get single word - fail', async() => {
    try {
      await service.getWord('foo')
    } catch (err) {
      expect(err.message).toBe(itemNotFound('foo'))
    }
  })
})
