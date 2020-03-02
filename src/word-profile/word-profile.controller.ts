import {Post, Controller, Get, Body, Param, Header} from '@nestjs/common'
import {WordProfileService} from './word-profile.service'
import {WordProfile} from '../interfaces/word-profile.interface'

@Controller('word-profile')
export class WordProfileController {
  constructor(private dbModel: WordProfileService) {}

  @Post('create')
  async createInstance(@Body() toSave: WordProfile) {
    const saved = await this.dbModel.create(toSave)

    return saved
  }
 
  @Post('remove')
  async removeInstance(@Body() removeFilter: Object) {
    const removed = await this.dbModel.remove(removeFilter)

    return `Removed document with id ${removed._id}`
  } 
 
  @Get('read/:word')
  async fi(): Promise<string> {
    return 'This action re1turns all 21'
  }
  @Get()
  async bar(): Promise<string> {
    console.log(';fd')
    // console.log(await this.dbModel.create({word: 'foo',related: [{translated: 'foo'}]}));
    return 'sk'
  }
}

// console.log(await this.dbModel.findAll());
