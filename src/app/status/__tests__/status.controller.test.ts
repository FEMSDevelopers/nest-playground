import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from '../status.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../../config/configuration';
import { RedisService } from '../../../shared/redis/redis.service';

const mockDbClient = {
  readyState: 1,
};
const mockRedisService = {
  get: (): Promise<boolean> => {
    return Promise.resolve(true);
  },
};

describe('AppController', () => {
  let controller: StatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        {
          provide: 'DatabaseConnection',
          useValue: mockDbClient,
        },
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
      ],
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
      ],
    }).compile();

    controller = module.get<StatusController>(StatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return ok', () => {
    controller.getStatus().then((data) => {
      expect(data).toEqual({ healthy: true, message: 'OK' });
    });
  });
});
