import {random, uuid} from 'rambdax'
import {Controller, Post, Body, Get} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {MongoRepository} from 'typeorm'
import {ObjectID} from 'mongodb'
import {Pet} from './pet.entity'

@Controller('pets')
export class PetsController {
  constructor(
    @InjectRepository(Pet)
    private readonly petsRepository: MongoRepository<Pet>
  ) {}

  @Post()
  async createPet(@Body() pet: Partial<Pet>): Promise<Pet | void> {
    if (!pet || !pet.name || !pet.animalType) {
      // throw new BadRequestException(
      //   `A pet must have at least name and animalType defined`
      // )
      return console.log(1)
    }
    return await this.petsRepository.save(new Pet(pet))
  }
  @Get('foo')
  async create(): Promise<void> {
    const newPet = {
      name: uuid(6, true),
      animalType: 'foo',
    }
    const saved = await this.petsRepository.save(new Pet(newPet))
    console.log(saved)
    return
  }
}
