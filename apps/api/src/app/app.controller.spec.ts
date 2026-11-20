import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getHealth', () => {
    it('returns the shared health contract', () => {
      const appController = app.get<AppController>(AppController);

      expect(appController.getHealth()).toEqual({
        status: 'ok',
        service: 'api',
        version: expect.any(String),
      });
    });
  });
});
