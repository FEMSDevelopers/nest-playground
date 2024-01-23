import {
  BadRequestException,
  Injectable,
  OnModuleInit,
  ValidationPipe,
} from '@nestjs/common';
import { SampleRouteService } from '../sample-route/sample-route.service';
import { MqttCoreDtoModel } from './_models/mqtt-core.dto.model';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import * as Buffer from 'buffer';
import { MqttCoreService } from '../../shared/mqtt-core/mqtt-core.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MqttCoreSubscribeService implements OnModuleInit {
  constructor(
    private sampleRouteService: SampleRouteService,
    private mqttCoreService: MqttCoreService,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const alertConfigs = await this.configService.get('mqtt.core.subTopics');
    this.mqttCoreService.subscribe(alertConfigs);
    this.mqttCoreService.mqttClient.on('message', (topic, buffer) =>
      this.handleMessage(topic, buffer),
    );
  }

  async handleMessage(topicName, data: Buffer) {
    // Accommodate payload of value type equal to string or number
    let validatedData = (await MqttCoreSubscribeService.transform(data)) as
      | MqttCoreDtoModel
      | number;
    if (typeof validatedData === 'number') {
      validatedData = {
        value: validatedData,
        ts: new Date().toISOString(),
      } as MqttCoreDtoModel;
    }

    return this.sampleRouteService.processAlert(topicName, validatedData);
  }

  static async transform(data: Buffer) {
    let parsedData;
    let transformed: MqttCoreDtoModel | number;

    try {
      parsedData = JSON.parse(data.toString()) as
        | MqttCoreDtoModel
        | string
        | number;
    } catch (e) {
      throw new BadRequestException(e);
    }

    if (!!parsedData && typeof parsedData === 'object') {
      transformed = plainToInstance(MqttCoreDtoModel, parsedData);
    } else if (
      typeof parsedData === 'string' ||
      typeof parsedData === 'number'
    ) {
      return Number(parsedData);
    } else {
      throw new BadRequestException('Invalid MqttCore payload.');
    }

    const validation = await validate(transformed);
    if (validation.length > 0) {
      const validationPipe = new ValidationPipe();
      const exceptionFactory = validationPipe.createExceptionFactory();
      throw exceptionFactory(validation);
    }

    return transformed;
  }
}
