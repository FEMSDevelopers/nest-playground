import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllExceptionsResponse, Status } from '../app.dto';
import { TimeoutInterceptor } from '../../common/utils/interceptors/time-out.interceptor';
import { RedisService } from '../../shared/redis/redis.service';

@ApiTags('Health Check')
@Controller('/status')
export class StatusController {
  constructor(private redisService: RedisService) {}

  @ApiResponse({
    status: 418,
    type: AllExceptionsResponse,
  })
  @UseInterceptors(new TimeoutInterceptor(5000))
  @Get('/')
  async getStatus(): Promise<Status> {
    return { healthy: true, message: 'OK' };
  }

  @Get('/clear-cache')
  public async clearCache() {
    return this.redisService.flushAll();
  }
}
