import './config/datadog';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';
import { setupSwagger } from './docs/swagger';
import { setupAsyncApi } from './docs/asyncapi';
import { AllExceptionsFilter } from './common/utils/filters/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('app.port');
  const cors = configService.get<boolean>('app.cors');

  if (cors) app.enableCors();

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  setupSwagger(app);
  await setupAsyncApi(app);

  await app.listen(port);
}

bootstrap();
