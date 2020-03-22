import {pass} from 'rambdax'
import {Controller, Post, Body, Get} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {MongoRepository} from 'typeorm'
import {ObjectID} from 'mongodb'
import {WordProfile} from './word-profile.entity'

@Controller('word-profile')
export class WordProfileController {
  constructor(
    @InjectRepository(WordProfile)
    private readonly wordProfileRepository: MongoRepository<WordProfile>
  ) {}

  @Post('create')
  async createInstance(
    @Body() toSave: Partial<WordProfile>
  ): Promise<WordProfile | void> {
    // if(!pass(toSave))
    // const saved = await this.wordProfileRepository.create(toSave)
    // console.log({saved})
    // return saved
  }

  @Get('foo')
  async create(): Promise<void> {
    // const newPet = {
    //   name: uuid(6, true),
    //   animalType: 'foo',
    // }
    const saved = await this.wordProfileRepository.save(
      new WordProfile({
        word: 'genug',
      })
    )
    console.log(saved)
    return
  }
}
