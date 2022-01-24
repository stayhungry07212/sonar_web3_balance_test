import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class Web3ServiceMock {
  balanceOf(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve('42035259194354177'), 100);
    });
  }

  decimals(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve('9'), 100);
    });
  }
}

describe('AppController', () => {
  let appService: AppService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: AppService,
      useClass: Web3ServiceMock,
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ApiServiceProvider],
    }).compile();

    // appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getBalance', () => {
    it('should return balance of the wallet', async () => {
      const expectedBalance = '42035259.194354177';
      const balance = await appService.balanceOf();
      expect(balance).toBe(expectedBalance);
    });
  });

  describe('getTokenPrice', () => {
    it('should return the usd price of the token', async () => {
      const expectedBalance = '0.0029';
      const balance = await appService.getTokenPrice(
        '0x5546600f77eda1dcf2e8817ef4d617382e7f71f5',
      );
      expect(balance).toBe(expectedBalance);
    });
  });
});
