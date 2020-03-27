import { log } from 'helpers-fn'
import mongoose from 'mongoose'

class Mongoose{
  constructor(url){
    this.url = url
  }

  async connect(){
    await mongoose.connect(this.url, {
      useUnifiedTopology : true,
      useNewUrlParser    : true,
    })
    log('# MONGO connected', 'box')
  }
}

export const MongooseInstanceFn = () => {
  const connectURL = process.env.MONGO_CONNECT_URL
  if(!connectURL){
    console.log('!connectURL')
    process.exit()
  }
  return new Mongoose(connectURL)
}
// export const MongooseInstanceFn = (db = 'foo') => new Mongoose(`mongodb://0.0.0.0:27017/${ db }`)
