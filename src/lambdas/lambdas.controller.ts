import {defaultTo} from 'rambdax'
import {Controller, Post, Body, Res, Logger, Get} from '@nestjs/common'
import {Response} from 'express'
import {SpeedReaderService} from 'lib/speed-reader'
import { WordProfileService } from 'lib/word-profile';

type tupleTypeA<T> = [T, undefined]
type tupleTypeB = [undefined, Error]

function wait<T>(fn): Promise<tupleTypeA<T>| tupleTypeB> {
  return new Promise(resolve => {
    fn
      .then(result => resolve([ result, undefined ]))
      .catch(e => resolve([ undefined, e ]))
  })
}

async function safeWait<T>(fn) : Promise<T|void>{
  try {
    const result = await fn
    return result
  } catch (err) {
    console.log(err)
    return undefined
  }
}

@Controller('lambdas')
export class LambdasController {
  private logger = new Logger('Lambdas');
 
  constructor(private speedReader: SpeedReaderService, private wordProfileService: WordProfileService) {}

  @Post('speed-reader')
  async createInstance(@Body() input: {id: number}, @Res() res: Response) {
    this.logger.log('speed.reader', JSON.stringify(input))
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
    const result = await safeWait<string[]>(this.wordProfileService.getWord(input.word))
    // const [result] = await wait<string[]>(this.wordProfileService.getWord(input.word))
    if (!result) return res.status(400).send()

    return res.status(200).send(result)
  }

  @Get()
  fallbackResponse(){
    return 'Lambdas route usually uses POST requests'
  }
}
