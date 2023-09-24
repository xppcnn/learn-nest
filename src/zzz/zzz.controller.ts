import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  OnModuleInit,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ZzzService } from './zzz.service';
import { CreateZzzDto } from './dto/create-zzz.dto';
import { UpdateZzzDto } from './dto/update-zzz.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('zzz')
export class ZzzController implements OnModuleInit, OnApplicationBootstrap {
  constructor(private readonly zzzService: ZzzService) {}
  onModuleInit() {
    console.log(
      '🚀 ~ file: zzz.controller.ts:24 ~ ZzzController ~ onModuleInit ~ onModuleInit:',
    );
  }
  onApplicationBootstrap() {
    console.log(
      '🚀 ~ file: zzz.controller.ts:29 ~ ZzzController ~ onApplicationBootstrap ~ onApplicationBootstrap:',
    );
  }
  @Post()
  create(@Body() createZzzDto: CreateZzzDto) {
    return `received: ${JSON.stringify(createZzzDto)}`;
  }

  @Get()
  findAll() {
    return this.zzzService.findAll();
  }

  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name},age=${age}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zzzService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZzzDto: UpdateZzzDto) {
    return this.zzzService.update(+id, updateZzzDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zzzService.remove(+id);
  }
  @Post('file')
  @UseInterceptors(AnyFilesInterceptor({ dest: 'uploads/' }))
  updateFile(
    @Body() createZzzDto: CreateZzzDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `received: ${JSON.stringify(createZzzDto)}`;
  }
}
