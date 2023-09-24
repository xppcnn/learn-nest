import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { CreateZzzDto } from './dto/create-zzz.dto';
import { UpdateZzzDto } from './dto/update-zzz.dto';

@Injectable()
export class ZzzService implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log(
      '🚀 ~ file: zzz.service.ts:12 ~ ZzzService ~ onModuleInit ~ onModuleInit:',
    );
  }
  onApplicationBootstrap() {
    console.log(
      '🚀 ~ file: zzz.service.ts:17 ~ ZzzService ~ onApplicationBootstrap ~ onApplicationBootstrap:',
    );
  }
  create(createZzzDto: CreateZzzDto) {
    return 'This action adds a new zzz';
  }

  findAll() {
    return `This action returns all zzz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zzz`;
  }

  update(id: number, updateZzzDto: UpdateZzzDto) {
    return `This action updates a #${id} zzz`;
  }

  remove(id: number) {
    return `This action removes a #${id} zzz`;
  }
}
