import {ObjectType, Field, Int, ID} from 'type-graphql'
import {IsString, IsNotEmpty, IsDefined} from 'class-validator'

@ObjectType()
class Related {
  @Field()
  text: string

  @Field()
  translated: string
}

@ObjectType()
export class ItemType {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  word: string

  // @Field(() => ObjectType)
  // @IsDefined()
  // readonly meta: object;
  // @Field(type => [Related])
  // related: object[];

  // @Field(() => [ObjectType])
  // @IsDefined()
  // readonly exampleSentences: object[];
}
