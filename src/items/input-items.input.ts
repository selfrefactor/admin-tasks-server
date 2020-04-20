import {InputType, Field, ObjectType, Int} from 'type-graphql'

@InputType()
export class ItemInput {
  @Field(() => String)
  word: string
  // @Field(() => ObjectType)
  // readonly meta: object;

  // @Field(() => [ObjectType])
  // readonly related: object[];

  // @Field(() => [ObjectType])
  // readonly exampleSentences: object[];

  // @Field(() => String)
  // readonly word: string;
}
