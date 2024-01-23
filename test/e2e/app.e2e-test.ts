import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SampleRouteService } from '../../src/app/sample-route/sample-route.service';

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'MQTT_SERVICE_CORE',
          useFactory: () => ({
            connect: jest.fn(),
            emit: jest.fn(),
          }),
        },
        {
          provide: SampleRouteService,
          useFactory: () => ({
            handleMessage: jest.fn(() => []),
          }),
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('is compiling', () => {
    expect(app).toBeDefined();
  });
});
