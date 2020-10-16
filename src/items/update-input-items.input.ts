import {InputType, Field} from 'type-graphql'

@InputType()
export class UpdateItemInput {
  @Field(() => String)
  word: string

  @Field(() => String)
  newWord: string
}
