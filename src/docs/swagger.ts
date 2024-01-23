import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { SampleModel } from '../app/sample-route/_models/sample.model';

const config = new DocumentBuilder()
  .setTitle('Sample Service')
  .setDescription('This service handles all EMS sample-route.')
  .setVersion('1.0')
  .build();

const options: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  extraModels: [SampleModel],
};

export const generateDoc = (app) => {
  return SwaggerModule.createDocument(app, config, options);
};

export const setupSwagger = (app) => {
  const document = generateDoc(app);
  SwaggerModule.setup('api', app, document);
};
