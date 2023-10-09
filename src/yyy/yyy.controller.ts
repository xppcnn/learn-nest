import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
  UseGuards,
} from '@nestjs/common';
import { YyyService } from './yyy.service';
import { CreateYyyDto } from './dto/create-yyy.dto';
import { UpdateYyyDto } from './dto/update-yyy.dto';
import { LoginGuard } from 'src/login.guard';

@Controller('yyy')
export class YyyController implements OnModuleInit, OnApplicationBootstrap {
  constructor(private readonly yyyService: YyyService) {}
  onModuleInit() {
    console.log(
      '🚀 ~ file: yyy.controller.ts:20 ~ YyyController ~ onModuleInit ~ onModuleInit:',
    );
  }
  onApplicationBootstrap() {
    console.log(
      '🚀 ~ file: yyy.controller.ts:25 ~ YyyController ~ onApplicationBootstrap ~ onApplicationBootstrap:',
    );
  }
  @Post()
  create(@Body() createYyyDto: CreateYyyDto) {
    return this.yyyService.create(createYyyDto);
  }

  @Get()
  findAll() {
    return this.yyyService.findAll();
  }

  @Get(':id')
  @UseGuards(LoginGuard)
  findOne(@Param('id') id: string) {
    return this.yyyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateYyyDto: UpdateYyyDto) {
    return this.yyyService.update(+id, updateYyyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yyyService.remove(+id);
  }
}
