import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientMqtt } from '@nestjs/microservices';
import { AsyncApi } from 'nestjs-asyncapi';

@Injectable()
@AsyncApi()
export class MqttWebService {
  constructor(
    @Inject('MQTT_SERVICE_WEB') protected mqttWebClient: ClientMqtt,
    private logger: Logger,
  ) {}

  publish(topic: string, value: unknown) {
    this.logger.debug(`MqttWebService - Publishing to MqttWeb at: ${topic}`);
    return this.mqttWebClient.emit(topic, value);
  }
}
