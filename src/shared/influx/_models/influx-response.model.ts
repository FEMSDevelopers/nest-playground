import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class InfluxResponse {
  @ApiProperty()
  @IsString()
  result: string;

  @ApiProperty()
  @IsNumber()
  table: number;

  @ApiProperty()
  // UTC DateString ISO format strict YYYY-MM-DDT00:00:000Z
  @IsDateString({ strict: true, strictSeparator: true })
  _start: string;

  @ApiProperty()
  // UTC DateString ISO format strict YYYY-MM-DDT00:00:000Z
  @IsDateString({ strict: true, strictSeparator: true })
  _stop: string;

  @ApiProperty()
  // UTC DateString ISO format strict YYYY-MM-DDT00:00:000Z
  @IsDateString({ strict: true, strictSeparator: true })
  _time: string;

  @ApiProperty()
  @IsString()
  _value: string;

  @ApiProperty()
  @IsString()
  _field: string;

  @ApiProperty()
  @IsString()
  _measurement: string;
}
