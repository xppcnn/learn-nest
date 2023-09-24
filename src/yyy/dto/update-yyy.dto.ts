import { PartialType } from '@nestjs/mapped-types';
import { CreateYyyDto } from './create-yyy.dto';

export class UpdateYyyDto extends PartialType(CreateYyyDto) {}
