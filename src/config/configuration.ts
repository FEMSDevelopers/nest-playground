import app from './app';
import bodyParser from './body-parser';
import influx from './influx';
import mqtt from './mqtt';
import redis from './redis';

export default () => ({
  app,
  bodyParser,
  influx,
  mqtt,
  redis,
  version: process.env.VERSION || '',
});
