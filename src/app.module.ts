import {Module} from '@nestjs/common'
import {getMongoConnectUrl} from 'lib/constants'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {PetsController} from './pets/pets.controller'
import {ConfigModule} from '@nestjs/config'
import {Pet} from './pets/pet.entity'
import {WordProfile} from './word-profile/word-profile.entity'
import {WordProfileController} from './word-profile/word-profile.controller'

// const mongoFlag = process.env.MONGO_ON === 'ON'
const mongoFlag = process.env.MONGO_ON !== 'OFF'

const getImportStatements = () => {
  if (!mongoFlag) return []
  const typeOrm = TypeOrmModule.forRoot({
    type: 'mongodb',
    url: getMongoConnectUrl(),
    database: 'word-profile',
    entities: [WordProfile, Pet],
    ssl: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  return [
    ConfigModule.forRoot(),
    typeOrm,
    TypeOrmModule.forFeature([Pet, WordProfile]),
  ]
}

@Module({
  imports: getImportStatements(),
  controllers: [AppController, WordProfileController, PetsController],
  providers: [AppService],
})
export class AppModule {}
