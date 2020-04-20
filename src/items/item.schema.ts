import * as mongoose from 'mongoose'

const relatedSchema = {
  type: Array,
  default: [],
}
const metaSchemaRaw = new mongoose.Schema({
  definition: {
    type: Array,
    default: [],
  },
  translation: {
    type: Array,
    default: [],
  },
  nearAlphabetical: {
    type: Array,
    default: [],
  },
  contextMeaning: {
    type: Array,
    default: [],
  },
})
const metaSchema = {
  type: metaSchemaRaw,
  default: {},
}

export const ItemSchema = new mongoose.Schema({
  word: String,
  // meta: metaSchema,
  // related: relatedSchema,
  // exampleSentences: relatedSchema,
})
