import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { XxxModule } from './xxx/xxx.module';
import { YyyModule } from './yyy/yyy.module';
import { ZzzModule } from './zzz/zzz.module';

@Module({
  imports: [AaaModule, XxxModule, ZzzModule, YyyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
