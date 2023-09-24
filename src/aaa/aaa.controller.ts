import { Controller, Get, UseFilters } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaFilter } from './aaa.filter';
import { AaaException, AaaExceptionType } from './AaaException';

@Controller('aaa')
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}
  @Get()
  @UseFilters(AaaFilter)
  getHello(): string {
    throw new AaaException('aaa', 'bbb');
    return this.aaaService.getAaa();
  }
}
