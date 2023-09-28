import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaFilter } from './aaa.filter';
import { AaaException } from './AaaException';
import { AaaGuard } from './aaa.guard';
import { Roles } from 'src/role.decorator';
import { Role } from 'src/role';

@Controller('aaa')
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}
  @Get()
  @UseFilters(AaaFilter)
  @UseGuards(AaaGuard)
  @Roles(Role.Admin)
  getHello(): string {
    throw new AaaException('aaa', 'bbb');
    return this.aaaService.getAaa();
  }
}
