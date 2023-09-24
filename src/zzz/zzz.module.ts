import { Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { ZzzService } from './zzz.service';
import { ZzzController } from './zzz.controller';

@Module({
  controllers: [ZzzController],
  providers: [ZzzService],
  exports: [ZzzService],
})
export class ZzzModule implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log(
      '🚀 ~ file: zzz.module.ts:12 ~ ZzzModule ~ onModuleInit ~ onModuleInit:',
    );
  }

  onApplicationBootstrap() {
    console.log(
      '🚀 ~ file: zzz.module.ts:18 ~ ZzzModule ~ onApplicationBootstrap ~ onApplicationBootstrap:',
    );
  }
}
