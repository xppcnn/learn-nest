import { Injectable } from '@nestjs/common';

@Injectable()
export class AaaService {
  getAaa(): string {
    return `aaa module hello`;
  }
}
