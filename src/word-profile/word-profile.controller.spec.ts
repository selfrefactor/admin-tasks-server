import {Test, TestingModule} from '@nestjs/testing'
import {WordProfileController} from './word-profile.controller'

describe('WordProfile Controller', () => {
  let controller: WordProfileController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordProfileController],
    }).compile()

    controller = module.get<WordProfileController>(WordProfileController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
