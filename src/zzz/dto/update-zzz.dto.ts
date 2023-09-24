import { PartialType } from '@nestjs/mapped-types';
import { CreateZzzDto } from './create-zzz.dto';

export class UpdateZzzDto extends PartialType(CreateZzzDto) {}
