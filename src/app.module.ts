import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { LambdasController } from './lambdas/lambdas.controller';
import { FsService } from 'lib/fs';
import { WordProfileService } from 'lib/word-profile';
import { AuthMiddleware } from 'libs/utils/auth.middleware';
import { DbFsService } from 'lib/db-fs';
import { ServeStaticModule } from '@nestjs/serve-static';
import { REPOS_DIR } from './constants';

const providers = [
  FsService,
  WordProfileService,
  DbFsService,
];
const botTeacherPath = `${REPOS_DIR}/secret-services/packages/bot-teacher/client/src`

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: botTeacherPath,
      serveRoot: '/bot-teacher',
    }),
  ],
  providers,
  controllers: [AppController, LambdasController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('lambdas');
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
