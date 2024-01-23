import { ApiProperty } from '@nestjs/swagger';

export class ISampleModel {
  @ApiProperty()
  ts: string;

  @ApiProperty()
  message: string;
}

export class SampleModel extends ISampleModel {
  constructor({ message, ts }: ISampleModel) {
    super();
    this.message = message;
    this.ts = ts;
  }
}
