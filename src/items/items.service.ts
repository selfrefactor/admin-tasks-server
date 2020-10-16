import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {ItemType} from './dto/create-item.dto'
import {Item} from './interfaces/item.interface'
import {ItemInput} from './input-items.input'

const fallback: Item = {
  word: 'FALLBACK',
}

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private itemModel: Model<Item>) {}

  async create(createItemDto: ItemInput): Promise<ItemType> {
    const createdItem = new this.itemModel(createItemDto)
    console.log({create: createItemDto})
    return await createdItem.save()
  }

  async findAll(): Promise<ItemType[]> {
    return await this.itemModel.find().exec()
  }

  async findOne(word: string): Promise<ItemType> {
    const result = await this.itemModel.findOne({word})
    console.log({searchResult: result, word})
    return result ? result : fallback
  }

  async findID(word: string): Promise<string | false> {
    const result = await this.itemModel.findOne({word})
    console.log({findResult: result, word})
    if (result) return result._id
    return false
  }

  async delete(word: string): Promise<ItemType | void> {
    const id = await this.findID(word)
    if (!id) return console.log('no success delete', word)

    return await this.itemModel.findByIdAndRemove(id)
  }

  async update(word: string, newWord: string): Promise<void | ItemType> {
    const id = await this.findID(word)
    if (!id) return console.log('no success update', word)

    const updated = await this.itemModel.findByIdAndUpdate(
      id,
      {word: newWord},
      {new: true}
    )
    console.log({updated})
    return {word: newWord}
  }
}
