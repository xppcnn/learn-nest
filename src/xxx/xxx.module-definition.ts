import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface XxxModuleOptions {
  aaa: number;
  bbb: string;
}
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<XxxModuleOptions>()
    .setClassMethodName('register')
    .build();
