import { Global, Logger, Module } from '@nestjs/common';
import { MqttCoreModule } from './mqtt-core/mqtt-core.module';
import { MqttWebModule } from './mqtt-web/mqtt-web.module';
import { RedisModule } from './redis/redis.module';
import { InfluxModule } from './influx/influx.module';

@Global()
@Module({
  imports: [MqttCoreModule, MqttWebModule, RedisModule, InfluxModule],
  providers: [Logger],
  exports: [MqttCoreModule, MqttWebModule, RedisModule, InfluxModule, Logger],
})
export class SharedModule {}
