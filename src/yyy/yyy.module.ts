import {
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { YyyService } from './yyy.service';
import { YyyController } from './yyy.controller';
import { ZzzModule } from 'src/zzz/zzz.module';

@Module({
  imports: [ZzzModule],
  controllers: [YyyController],
  providers: [YyyService],
})
export class YyyModule
  implements OnModuleInit, OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit() {
    console.log(
      '🚀 ~ file: yyy.module.ts:13 ~ YyyModule ~ onModuleInit ~ onModuleInit:',
    );
  }
  onApplicationBootstrap() {
    console.log(
      '🚀 ~ file: yyy.module.ts:18 ~ YyyModule ~ onApplicationBootstrap ~ onApplicationBootstrap:',
    );
  }
  onApplicationShutdown(signal?: string) {
    const yyyService = this.moduleRef.get<YyyService>(YyyService);
    console.log(
      signal,
      '🚀 ~ file: yyy.module.ts:33 ~ onApplicationShutdown ~ yyyService:',
      yyyService.findAll(),
    );
  }
}
