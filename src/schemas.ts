import * as mongoose from 'mongoose'

const {Schema} = mongoose

const relatedSchema = {
  type: Array,
  default: [],
}
const metaSchemaRaw = new Schema({
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
export const WordProfileSchema = new Schema({
  word: String,
  meta: metaSchema,
  timestamp: String,
  related: relatedSchema,
  exampleSentences: relatedSchema,
})

const LearnSmarterSchema = new Schema({
  id: String,
  deWord: String,
  enWord: String,
  bgWord: {
    type: String,
    default: '',
  },
  dePart: String,
  enPart: String,
  bgPart: {
    type: String,
    default: '',
  },
  altTag: String,
  imageSrc: {
    type: String,
    default: '',
  },
  imageSrcOrigin: {
    type: String,
    default: '',
  },
  deRelated: {
    type: Array,
    default: [],
  },
  enRelated: {
    type: Array,
    default: [],
  },
  bgRelated: {
    type: Array,
    default: [],
  },
  pcFlag: Boolean,
  updated: Number,
  timestamp: Number,
})

const FooSchema = new Schema({word: String})

const WordProfileModel = mongoose.model('WordProfile', WordProfileSchema)
const FooModel = mongoose.model('Foo', FooSchema)
const LearnSmarterModel = mongoose.model('LearnSmarter', LearnSmarterSchema)

const allModels = {
  learnSmarter: LearnSmarterModel,
  foo: FooModel,
  wordProfile: WordProfileModel,
}

function getCurrentModel(model = 'foo') {
  const currentModel = allModels[model]
  if (!currentModel) throw new Error(`model '${model}' is wrong`)

  return currentModel
}

export function save(input, model) {
  const CurrentModel = getCurrentModel(model)

  return new Promise((resolve, reject) => {
    const Instance = new CurrentModel(input)
    Instance.save((err, saveResult) => {
      if (err) return reject(err)
      resolve(saveResult)
    })
  })
}

export function readWordProfile(word) {
  return new Promise(resolve => {
    WordProfileModel.findOne({word}, (err, queryResult) => {
      if (err) return resolve(false)

      resolve(queryResult)
    })
  })
}

export function readLearnSmarter(id) {
  return new Promise(resolve => {
    LearnSmarterModel.findOne({id}, (err, queryResult) => {
      if (err) return resolve(false)

      resolve(queryResult)
    })
  })
}

export function readAll(model) {
  const CurrentModel = getCurrentModel(model)

  return new Promise((resolve, reject) => {
    CurrentModel.find({}, (err, queryResult) => {
      if (err) return reject(err)

      resolve(queryResult)
    })
  })
}
