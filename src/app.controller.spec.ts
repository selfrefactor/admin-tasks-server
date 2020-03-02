import {Test, TestingModule} from '@nestjs/testing'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {foo} from './word-profile/foo'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    test('happy', () => {
      expect(foo(1)).toBe(3)
    })
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!')
    })
  })
})
