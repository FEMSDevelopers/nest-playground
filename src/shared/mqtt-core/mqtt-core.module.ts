import { Module } from '@nestjs/common';
import { MqttCoreService } from './mqtt-core.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OutboundResponseSerializer } from '../../common/utils/serializers/outbound-response.serializer';
import MqttConfig from '../../config/mqtt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE_CORE',
        transport: Transport.MQTT,
        options: {
          url: MqttConfig.core.url,
          serializer: new OutboundResponseSerializer(),
        },
      },
    ]),
  ],
  providers: [MqttCoreService],
  exports: [MqttCoreService],
})
export class MqttCoreModule {}
