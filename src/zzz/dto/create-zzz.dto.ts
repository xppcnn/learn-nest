import { IsInt } from 'class-validator';

export class CreateZzzDto {
  name: string;
  @IsInt()
  age: number;
}
