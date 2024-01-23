import { Module } from '@nestjs/common';
import { MqttCoreSubscribeService } from './mqtt-core-subscribe.service';
import { SampleRouteModule } from '../sample-route/sample-route.module';

@Module({
  imports: [SampleRouteModule],
  providers: [MqttCoreSubscribeService],
  exports: [MqttCoreSubscribeService],
})
export class MqttCoreSubscribeModule {}
