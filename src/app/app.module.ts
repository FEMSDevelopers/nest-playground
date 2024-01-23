import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { SharedModule } from '../shared/shared.module';
import { SampleRouteModule } from './sample-route/sample-route.module';
import { MqttCoreSubscribeModule } from './mqtt-core-subscribe/mqtt-core-subscribe.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    SharedModule,
    StatusModule,
    MqttCoreSubscribeModule,
    SampleRouteModule,
  ],
})
export class AppModule {}
