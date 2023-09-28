import { Module } from '@nestjs/common';
import { XxxService } from './xxx.service';
import { XxxController } from './xxx.controller';
import { ConfigurableModuleClass } from './xxx.module-definition';

@Module({
  controllers: [XxxController],
  providers: [XxxService],
  exports: [XxxService],
})
export class XxxModule extends ConfigurableModuleClass {}
