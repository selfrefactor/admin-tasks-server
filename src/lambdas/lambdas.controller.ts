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
import {SpeedReaderService} from 'lib/speed-reader'
import {safeWait, getRandomIndexes} from 'lib/utils'
import {WordProfileService, WordProfile} from 'lib/word-profile'
import {FsService} from 'lib/fs'
import {NotFoundException} from '@nestjs/common'

@Controller('lambdas')
export class LambdasController {
  private logger = new Logger('Lambdas')
  private allBulgarianWords: string[] = []

  constructor(
    private speedReader: SpeedReaderService,
    private wordProfileService: WordProfileService,
    private fsService: FsService
  ) {}

  private getRandomBulgarianWords(numberOfIndexes: number) {
    const indexes = getRandomIndexes(
      this.allBulgarianWords.length,
      numberOfIndexes
    )

    return indexes.map(i => this.allBulgarianWords[i])
  }

  @Post('random-bulgarian-word')
  async randomBulgarianWord() {
    if (this.allBulgarianWords.length > 0) {
      return this.getRandomBulgarianWords(6)
    }
    const rawData = await this.fsService.readFromData(
      'all-bulgarian-words.json'
    )
    const parsed = JSON.parse(rawData)
    this.allBulgarianWords = parsed.data

    return this.getRandomBulgarianWords(6)
  }

  @Post('speed-reader')
  async createInstance(@Body() input: {id: number}, @Res() res: Response) {
    // this.logger.log('speed.reader', JSON.stringify(input))
    if (!input) return res.status(400).send()
    const bookIndex = defaultTo(0, Number(input.id))
    const result = await this.speedReader.readBook(bookIndex)
    if (!result) return res.status(400).send()

    return res.status(200).send(result)
  }

  @Post('word-profile/all-words')
  async getAllWords(@Res() res: Response) {
    this.logger.log('word.profile.all.words')
    const result = await this.wordProfileService.getAllWords()

    return res.status(200).send(result)
  }

  @Post('word-profile')
  async getWord(@Body() input: {word: string}, @Res() res: Response) {
    this.logger.log('word.profile', JSON.stringify(input))
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
