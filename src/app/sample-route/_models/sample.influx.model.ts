import { Point } from '@influxdata/influxdb-client';
import { SampleModel } from './sample.model';

export class SampleInfluxPoint extends Point {
  constructor(sample: SampleModel) {
    super();
    super
      .measurement('sample_influx_db')
      .stringField('value', sample.message)
      .tag('ts', sample.ts);
  }
}
