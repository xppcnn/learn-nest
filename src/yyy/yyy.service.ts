import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { CreateYyyDto } from './dto/create-yyy.dto';
import { UpdateYyyDto } from './dto/update-yyy.dto';
import { ZzzService } from 'src/zzz/zzz.service';

@Injectable()
export class YyyService implements OnModuleInit, OnApplicationBootstrap {
  constructor(private zzzService: ZzzService) {}
  onModuleInit() {
    console.log(
      '🚀 ~ file: yyy.service.ts:14 ~ YyyService ~ onModuleInit ~ onModuleInit:',
    );
  }
  onApplicationBootstrap() {
    console.log(
      '🚀 ~ file: yyy.service.ts:19 ~ YyyService ~ onApplicationBootstrap ~ onApplicationBootstrap:',
    );
  }
  create(createYyyDto: CreateYyyDto) {
    return 'This action adds a new yyy';
  }

  findAll() {
    return `This action returns all yyy ${this.zzzService.findAll()}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} yyy`;
  }

  update(id: number, updateYyyDto: UpdateYyyDto) {
    return `This action updates a #${id} yyy`;
  }

  remove(id: number) {
    return `This action removes a #${id} yyy`;
  }
}
