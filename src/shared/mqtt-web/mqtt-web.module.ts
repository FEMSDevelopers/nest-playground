import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import MqttConfig from '../../config/mqtt';
import { OutboundResponseSerializer } from '../../common/utils/serializers/outbound-response.serializer';
import { MqttWebService } from './mqtt-web.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE_WEB',
        transport: Transport.MQTT,
        options: {
          url: MqttConfig.web.url,
          serializer: new OutboundResponseSerializer(),
        },
      },
    ]),
  ],
  providers: [MqttWebService],
  exports: [MqttWebService],
})
export class MqttWebModule {}
