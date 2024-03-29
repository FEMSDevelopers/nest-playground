import {
  AsyncApiModule,
  AsyncApiDocumentBuilder,
  AsyncApiDocumentOptions,
} from 'nestjs-asyncapi';
import { SampleModel } from '../app/sample-route/_models/sample.model';

const config = new AsyncApiDocumentBuilder()
  .setTitle('Sample Service: Public Realtime API')
  .setDescription('This is the public realtime API for the Sample Service.')
  .setVersion('1.0-beta')
  .build();

const options = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  extraModels: [SampleModel],
} as AsyncApiDocumentOptions;

export const generateAsyncDoc = (app) => {
  return AsyncApiModule.createDocument(app, config, options);
};

export const setupAsyncApi = async (app) => {
  const document = generateAsyncDoc(app);
  await AsyncApiModule.setup('asyncapi', app, document);
};
