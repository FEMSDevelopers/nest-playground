export type InfluxConfig = {
  API_TOKEN: string;
  BUCKET: string;
  ORG: string;
  URL: string;
};

const influxDb: InfluxConfig = {
  API_TOKEN: process.env.INFLUXDB_INIT_ADMIN_TOKEN || 'admintoken',
  BUCKET: process.env.INFLUX_DATABASE || 'ems-web',
  ORG: process.env.INFLUX_ORG || 'fractal',
  URL: process.env.INFLUXDB_URL || 'http://localhost:8086',
};

export default influxDb;
