import { Test } from '@nestjs/testing';
import { SampleRouteController } from '../sample-route.controller';
import { SampleRouteService } from '../sample-route.service';

const serviceStub = {
  getAlerts: jest.fn(),
};

describe('AlertsController', () => {
  let alertsController: SampleRouteController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [SampleRouteController],
      providers: [
        {
          provide: 'MQTT_SERVICE_WEB',
          useValue: jest.fn(),
        },
        {
          provide: SampleRouteService,
          useValue: serviceStub,
        },
      ],
    }).compile();

    alertsController = module.get<SampleRouteController>(SampleRouteController);
  });

  afterEach(() => {
    serviceStub.getAlerts.mockClear();
  });

  afterAll(() => {
    serviceStub.getAlerts.mockRestore();
  });

  describe('listActiveAlerts', () => {
    it('should return active sample-route', async () => {
      await alertsController.listActiveAlerts();

      expect(serviceStub.getAlerts).toHaveBeenCalled();
    });
  });
});
