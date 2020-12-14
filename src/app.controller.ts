import {Controller, Get} from '@nestjs/common'
import {AppService} from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('callback')
  getCallback(): string {
    return 'You hit callback route'
  }

  @Get('sign-out')
  getSignOut(): string {
    return 'You hit sign-out route'
  }

  @Get('*')
  getAny(): string {
    return 'You hit wildcard route'
  }
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
