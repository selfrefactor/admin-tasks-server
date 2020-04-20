import {Document} from 'mongoose'

export interface Item extends Document {
  readonly word: string,
  // readonly meta: object;
  // readonly related: object[];
  // readonly exampleSentences: object[];
}
