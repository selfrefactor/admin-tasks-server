import {defaultTo} from 'rambdax'
import {
  Controller,
  Post,
  Body,
  Res,
  Logger,
  Get,
} from '@nestjs/common'
import {Response} from 'express'
import {safeWait} from 'lib/utils'
import {WordProfileService, WordProfile} from 'lib/word-profile'
import {NotFoundException} from '@nestjs/common'

@Controller('lambdas')
export class LambdasController {
  private logger = new Logger('Lambdas')

  constructor(
    private wordProfileService: WordProfileService,
  ) {}
 

  @Post('word-profile/all-words')
  async getAllWords(@Res() res: Response) {
    this.logger.log('word.profile.all.words')
    const result = await this.wordProfileService.getAllWords()

    return res.status(200).send(result)
  }

  @Post('word-profile')
  async getWord(@Body() input: {word: string}, @Res() res: Response) {
    this.logger.log('word.profile', input.word)
    if (!input) return res.status(400).send()

    const result = await safeWait<WordProfile>(
      this.wordProfileService.getWord(input.word)
    )

    if (!result) throw new NotFoundException()

    return res.status(200).send(result)
  }

  @Get()
  fallbackResponse() {
    return 'Lambdas route usually uses POST requests'
  }
}
