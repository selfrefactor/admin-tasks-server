import {Injectable} from '@nestjs/common'
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import {WordProfile} from '../interfaces/word-profile.interface'

@Injectable()
export class WordProfileService {
  constructor(
    @InjectModel('WordProfile')
    private readonly wordProfileModel: Model<WordProfile>
  ) {}

  async create(toCreate: WordProfile): Promise<WordProfile> {
    const createdWordProfile = new this.wordProfileModel(toCreate)

    const saved = createdWordProfile.save()
    console.log({saved})
    return saved
  }

  async remove(removeFilter: Object): Promise<any> {
    const removed =await this.wordProfileModel.findOneAndRemove(removeFilter).exec()
    console.log({removed})
    return removed
  }

  async find(word: string): Promise<WordProfile> {
    // normalize doc with lib
    const found = this.wordProfileModel.find({word}).exec()
    console.log({found})
    return found
  }

  async findAll(): Promise<string> {
    console.log(this.wordProfileModel)
    return this.wordProfileModel.find().exec()
  }
  sk(): void {
    console.log(12)
  }
}
