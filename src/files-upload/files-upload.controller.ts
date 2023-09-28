import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { CreateFilesUploadDto } from './dto/create-files-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { storage } from 'src/utils/fileUtils';

@Controller('files-upload')
export class FilesUploadController {
  constructor(private readonly filesUploadService: FilesUploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
      storage: storage,
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateFilesUploadDto,
  ) {
    console.log(file);
    console.log(body);
  }

  @Post('files')
  @UseInterceptors(
    FilesInterceptor('file', 2, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateFilesUploadDto,
  ) {
    console.log(
      '🚀 ~ file: files-upload.controller.ts:41 ~ FilesUploadController ~ body:',
      body,
    );
    console.log(
      '🚀 ~ file: files-upload.controller.ts:41 ~ FilesUploadController ~ files:',
      files,
    );
  }
}
