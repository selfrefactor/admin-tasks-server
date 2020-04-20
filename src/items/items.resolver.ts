import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {ItemsService} from './items.service'
import {ItemType} from './dto/create-item.dto'
import {ItemInput} from './input-items.input'

@Resolver()
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [ItemType])
  async items(): Promise<ItemType[]> {
    const all = await this.itemsService.findAll()
    console.log(111, {all: all.length})
    return this.itemsService.findAll()
  }

  @Query(() => ItemType)
  async item(@Args('word') input: string): Promise<ItemType> {
    return this.itemsService.findOne(input)
  }

  @Mutation(() => ItemType)
  async createItem(@Args('input') input: ItemInput): Promise<ItemInput> {
    return this.itemsService.create(input)
  }

  // @Mutation(() => ItemType)
  // async updateItem(
  //   @Args('id') id: string,
  //     @Args('input') input: ItemInput
  // ): Promise<ItemInput> {
  //   return this.itemsService.update(id, input)
  // }

  // @Mutation(() => ItemType)
  // async deleteItem(@Args('id') id: string): Promise<ItemInput> {
  //   return this.itemsService.delete(id);
  // }

  // @Query(() => String)
  // async hello() {
  //   return 'hello'
  // }
}
