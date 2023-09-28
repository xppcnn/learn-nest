import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { XxxModule } from './xxx/xxx.module';
import { YyyModule } from './yyy/yyy.module';
import { ZzzModule } from './zzz/zzz.module';
import { XxxMiddleWare } from './xxx/xxx.middleware';
import { FilesUploadModule } from './files-upload/files-upload.module';

@Module({
  imports: [
    AaaModule,
    XxxModule.register({
      aaa: 11,
      bbb: '222',
    }),
    ZzzModule,
    YyyModule,
    FilesUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XxxMiddleWare).forRoutes('*');
  }
}
