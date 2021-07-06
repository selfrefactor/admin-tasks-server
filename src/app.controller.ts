import {Controller, Get} from '@nestjs/common'

@Controller()
export class AppController {
  @Get('*')
  getAny(): string {
    return      'You hit wildcard route'
  }
}
