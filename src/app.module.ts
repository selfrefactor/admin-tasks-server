import {Module} from '@nestjs/common'
import {getMongoConnectUrl} from 'lib/constants'
import {AppController} from './app.controller'
import {AppService} from './app.service'
// import {WordProfileModule} from './word-profile/word-profile.module'
import {TypeOrmModule} from '@nestjs/typeorm'
import {PetsController} from './pets/pets.controller'
import {ConfigModule} from '@nestjs/config'
import {Pet} from './pets/pet.entity'

// const mongoFlag = process.env.MONGO_ON === 'ON'
const mongoFlag = process.env.MONGO_ON !== 'OFF'

const getImportStatements = () => {
  if (!mongoFlag) return []

  const typeOrm = TypeOrmModule.forRoot({
    type: 'mongodb',
    url: getMongoConnectUrl(),
    database: 'pets',
    entities: [Pet],
    ssl: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  return [ConfigModule.forRoot(), typeOrm, TypeOrmModule.forFeature([Pet])]
}

@Module({
  imports: getImportStatements(),
  controllers: [AppController, PetsController],
  providers: [AppService],
})
export class AppModule {}
