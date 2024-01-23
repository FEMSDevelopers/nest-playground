import { Module } from '@nestjs/common';
import { SampleRouteController } from './sample-route.controller';
import { SampleRouteService } from './sample-route.service';

@Module({
  controllers: [SampleRouteController],
  providers: [SampleRouteService],
  exports: [SampleRouteService],
})
export class SampleRouteModule {}
