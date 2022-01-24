import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ApiService } from './api.service';
import { WalletService } from './wallet.service';

interface Balance {
  balance: string;
  decimals: string;
}

class ApiServiceMock {
  getBalance(): Promise<Balance> {
    return new Promise((resolve) => {
      setTimeout(
        () => resolve({ balance: '42078562525576465', decimals: '9' }),
        100,
      );
    });
  }

  getTokenPrice(): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(0.0029), 100);
    });
  }
}

describe('WalletService', () => {
  let walletService: WalletService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ApiService,
      useClass: ApiServiceMock,
    };
    const app: TestingModule = await Test.createTestingModule({
      providers: [WalletService, ApiServiceProvider],
    }).compile();

    // appController = app.get<AppController>(AppController);
    walletService = app.get<WalletService>(WalletService);
  });

  describe('getContractHoldings', () => {
    it('should return token holdings of the wallet', async () => {
      const expectedBalance = '42078562.525576465';
      const balance = await walletService.getContractHoldings(
        '0x6b9ab559bae34464594376a8860ff5f1bf16fa62',
        '0x5546600f77eda1dcf2e8817ef4d617382e7f71f5',
      );
      expect(balance).toBe(expectedBalance);
    });
  });
});
