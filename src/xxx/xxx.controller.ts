import { Controller, Get, Param, Inject } from '@nestjs/common';
import { XxxService } from './xxx.service';

import { MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } from './xxx.module-definition';
import { RequireLogin, RequirePermission } from 'src/common.decorator';

@Controller('xxx')
@RequireLogin()
export class XxxController {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: typeof OPTIONS_TYPE,
    private readonly xxxService: XxxService,
  ) {}

  // @Post()
  // create(@Body() createXxxDto: CreateXxxDto) {
  //   return this.xxxService.create(createXxxDto);
  // }

  // @Get()
  // findAll() {
  //   return this.xxxService.findAll();
  // }

  @Get(':id')
  @RequirePermission('新增 bbb')
  findOne(@Param('id') id: string) {
    // return this.options;
    return this.xxxService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateXxxDto: UpdateXxxDto) {
  //   return this.xxxService.update(+id, updateXxxDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.xxxService.remove(+id);
  // }
}
