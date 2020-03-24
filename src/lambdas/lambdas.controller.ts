import {defaultTo} from 'rambdax'
import {Controller, Post, Body, Res, Logger} from '@nestjs/common'
import {Response} from 'express'
import {SpeedReaderService} from 'lib/speed-reader'

@Controller('lambdas')
export class LambdasController {
  private logger = new Logger('Lambdas');

  constructor(private speedReader: SpeedReaderService) {}

  @Post('speed-reader')
  async createInstance(@Body() input: {id: number}, @Res() res: Response) {
    this.logger.log('speed.reader', JSON.stringify(input))
    if (!input) return res.status(400).send()
    const bookIndex = defaultTo(0, Number(input.id))
    const result = await this.speedReader.readBook(bookIndex)
    if (!result) return res.status(400).send()

    return res.status(200).send(result)
  }
}
