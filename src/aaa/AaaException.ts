export class AaaException {
  constructor(
    public aaa: string,
    public bbb: string,
  ) {}
}

export interface AaaExceptionType {
  aaa: string;
  bbb: string;
}
