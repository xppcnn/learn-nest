import { Module } from '@nestjs/common';
import { XxxService } from './xxx.service';
import { XxxController } from './xxx.controller';
import { ConfigurableModuleClass } from './xxx.module-definition';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [XxxController],
  providers: [XxxService],
  exports: [XxxService],
  imports: [UserModule],
})
export class XxxModule extends ConfigurableModuleClass {}
