import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, disconnect } from 'mongoose';

let mongo: MongoMemoryServer;
let mongoConnection: Connection;

export const openMongoConnection = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  mongoConnection = (await connect(uri)).connection;
  return mongoConnection;
};

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongo = await MongoMemoryServer.create();
      return {
        uri: mongo.getUri(),
        ...options,
      };
    },
  });

export const closeMongoConnection = async () => {
  await disconnect();
  if (mongo) await mongo.stop();
};
