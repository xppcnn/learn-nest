import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { XxxService } from './xxx.service';
import { CreateXxxDto } from './dto/create-xxx.dto';
import { UpdateXxxDto } from './dto/update-xxx.dto';
import { MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } from './xxx.module-definition';
import { LoginGuard } from 'src/login.guard';
import { PermissionGuard } from 'src/user/permission.guard';

@Controller('xxx')
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
  @UseGuards(LoginGuard, PermissionGuard)
  @SetMetadata('permission', 'query_aaa')
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
