import { IsDateString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class MqttCoreDtoModel {
  // UTC DateString ISO format strict YYYY-MM-DDT00:00:000Z
  @IsDateString({ strict: true, strictSeparator: true })
  readonly ts: string;

  // Number format, but accepts String numbers and uses @Type to convert
  @Type(() => Number)
  @IsNumber()
  readonly value: number;
}
