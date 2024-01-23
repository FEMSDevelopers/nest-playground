import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class RegexPipe implements PipeTransform {
  constructor(private regex: RegExp) {}

  async transform(value: string) {
    if (!this.regex.test(value)) {
      throw new BadRequestException();
    }
    return value;
  }
}
