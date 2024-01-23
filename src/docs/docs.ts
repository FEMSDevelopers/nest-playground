import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

import { ValidationPipe } from '@nestjs/common';
import { generateDoc } from './swagger';
import { generateAsyncDoc } from './asyncapi';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app/app.module';
import { AllExceptionsFilter } from '../common/utils/filters/exceptions.filter';
import { rootMongooseTestModule } from 'test/utils/mongo';

/**
 * Entry point for "docs" script. Creates INestAplication object through the use of testing module.
 * Connection to DB is mocked so that documentation can be generated even without any separate
 * Mongo instance. This is necessary because of how NestJS resolves its dependancy injections.
 *
 * This file is required by docsConfig.json
 */

async function generate() {
  const moduleRef = await Test.createTestingModule({
    imports: [rootMongooseTestModule(), AppModule],
  }).compile();
  const app = moduleRef.createNestApplication();

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  const document = generateDoc(app);
  const outputPath = path.resolve(process.cwd(), 'swagger.json');
  fs.writeFileSync(outputPath, JSON.stringify(document), {
    encoding: 'utf8',
  });

  const asyncDocument = generateAsyncDoc(app);
  const asyncOutputPath = path.resolve(process.cwd(), 'asyncapi.json');
  fs.writeFileSync(asyncOutputPath, JSON.stringify(asyncDocument), {
    encoding: 'utf8',
  });

  await app.close();
  execSync('npm run format');
  execSync('npm run lint:fix');
  process.exit();
}
generate();
