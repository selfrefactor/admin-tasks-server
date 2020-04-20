import {envFn} from 'env-fn'
envFn('special')
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
  GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
  }),
  ItemsModule,
  MongooseModule.forRoot(process.env.WORD_PROFILE_MONGO_CONNECT_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
