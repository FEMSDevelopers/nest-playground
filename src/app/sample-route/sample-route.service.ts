import { Injectable, Logger } from '@nestjs/common';

import mqttConfig from '../../config/mqtt';
import { SampleModel } from './_models/sample.model';
import { InfluxService } from '../../shared/influx/influx.service';
import { SampleInfluxPoint } from './_models/sample.influx.model';
import { MqttWebService } from '../../shared/mqtt-web/mqtt-web.service';
import { RedisService } from '../../shared/redis/redis.service';
import { MqttCoreDtoModel } from '../mqtt-core-subscribe/_models/mqtt-core.dto.model';

@Injectable()
export class SampleRouteService {
  private redisAlertPrefix = 'currentAlert#';

  constructor(
    private redisService: RedisService,
    private influxService: InfluxService,
    private mqttWebService: MqttWebService,
    private logger: Logger,
  ) {}

  // SAMPLE QUERY INFLUX
  // generateFluxQueryPipes(filter: FilterAlertHistoricalDto) {
  //   return `
  //     |> range(start: ${fluxDuration(filter.start)})
  //     |> filter(fn:(r) =>
  //       r._measurement == "historical_alerts" and
  //       ((r.isActive == "true" and r.isDraft == "false" and r.isDraftDelete == "false") or
  //        (r.isActive == "false" and r.isDraft == "false" and r.isDraftDelete == "false")
  //       )
  //     )
  //     |> group()
  //     |> sort(columns: ["_time"], desc: true)
  //     |> limit(n: ${fluxInteger(filter.limit)}, offset: ${fluxInteger(
  //     filter.offset,
  //   )})
  //   `;
  // }
  //
  // getAlertHistory(filter: FilterAlertHistoricalDto) {
  //   const fluxQueryPipes = this.generateFluxQueryPipes(filter);
  //   return this.influxService.query<AlertHistoricalModel>(fluxQueryPipes);
  // }

  async getAlerts() {
    this.logger.debug('SampleRouteService.getAlerts');
    // hardcoded SampleModel array response
    return [new SampleModel({ message: 'Test', ts: new Date().toISOString() })];
  }

  async postToDbs(sampleModel: SampleModel, removal?) {
    // Write to RedisCache example
    if (removal && !sampleModel.message) {
      await this.redisService.del(`${this.redisAlertPrefix}${sampleModel.ts}`);
    } else {
      await this.redisService.set(
        `${this.redisAlertPrefix}${sampleModel.ts}`,
        JSON.stringify(sampleModel),
      );
    }

    // Write to InfluxDB example
    const influxPoint = new SampleInfluxPoint(sampleModel);
    await this.influxService.writePoint(influxPoint);

    // Publish to MqttWeb if removal or message and ts exists
    if (removal && sampleModel.message && sampleModel.ts) {
      await this.mqttWebService.publish(mqttConfig.web.pubTopic, sampleModel);
    }
    return;
  }

  async processAlert(topicName: string, payload: MqttCoreDtoModel) {
    this.logger.debug('SampleRouteService.processAlert', {
      topicName,
      payload,
    });
    const { ts, value } = payload;
    const sampleModel = new SampleModel({ message: value.toString(), ts });
    return this.postToDbs(sampleModel);
  }
}
