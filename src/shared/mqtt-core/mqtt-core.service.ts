import { Inject, Injectable } from '@nestjs/common';
import { ClientMqtt } from '@nestjs/microservices';
import { MqttClient } from '@nestjs/microservices/external/mqtt-client.interface';

@Injectable()
export class MqttCoreService {
  readonly mqttClient: MqttClient;

  constructor(
    @Inject('MQTT_SERVICE_CORE') protected mqttCoreClient: ClientMqtt,
  ) {
    this.mqttClient = this.mqttCoreClient.createClient();
  }

  subscribe(topicOrList: string | string[]) {
    return this.mqttClient.subscribe(topicOrList);
  }

  unsubscribe(topicOrList: string | string[]) {
    return this.mqttClient.unsubscribe(topicOrList);
  }
}
