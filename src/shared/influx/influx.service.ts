import { Injectable, Logger } from '@nestjs/common';
import {
  fluxString,
  InfluxDB,
  Point,
  QueryApi,
  WriteApi,
} from '@influxdata/influxdb-client';
import { ConfigService } from '@nestjs/config';
import { InfluxConfig } from '../../config/influx';

@Injectable()
export class InfluxService {
  connection: InfluxDB | null;
  queryApi: QueryApi | null;
  writeApi: WriteApi | null;
  bucket: string | null;

  constructor(
    private logger: Logger,
    private readonly configSvc: ConfigService,
  ) {
    const { API_TOKEN, BUCKET, ORG, URL } =
      this.configSvc.get<InfluxConfig>('influx');
    this.connection = new InfluxDB({ url: URL, token: API_TOKEN });
    this.queryApi = this.connection.getQueryApi(ORG);
    this.writeApi = this.connection.getWriteApi(ORG, BUCKET);
    this.bucket = BUCKET;
  }

  public async writePoint(supposedPoint: unknown | Point) {
    this.logger.debug('InfluxService - Pushing event to InfluxDB');
    if (!(supposedPoint instanceof Point)) {
      return this.logger.error(
        new Error(
          'InfluxService - Incorrect data format passed to InfluxDB Write API.',
        ),
      );
    }
    return this.writeApi.writePoint(supposedPoint);
  }

  public generateQuery(queryPipes: string) {
    return `from(bucket: ${fluxString(this.bucket)}) ` + queryPipes;
  }

  public query<T>(fluxQueryPipes: string) {
    const query = this.generateQuery(fluxQueryPipes);
    return this.queryApi.collectRows<T>(query);
  }
}
