import { Controller, Get, Param, HttpException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:wallet_address/:contract_address')
  async getWalletHoldings(
    @Param('wallet_address') wallet_address: string,
    @Param('contract_address') contract_address: string,
  ): Promise<any> {
    if (!wallet_address || !contract_address) {
      throw new HttpException('Incomplete address information', 400);
    }
    try {
      const balance = await this.appService.getWalletHolding(
        wallet_address,
        contract_address,
      );
      const usdPrice = await this.appService.getTokenPrice(contract_address);

      // futher enhancement to do: replace with library-specific response like express
      return {
        holdings: +balance,
        amountInUsd: usdPrice * +balance,
      };
    } catch (error) {
      return error;
    }
  }
}
