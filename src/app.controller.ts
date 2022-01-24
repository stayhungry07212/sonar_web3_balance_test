import { Controller, Get, Param, HttpException } from '@nestjs/common';
import { BigNumber } from 'bignumber.js';

import { WalletService } from './wallet.service';
import { ApiService } from './api.service';

@Controller()
export class AppController {
  constructor(
    private readonly walletService: WalletService,
    private readonly api: ApiService,
  ) {}

  @Get('/:wallet_address/:contract_address')
  async getWalletHoldings(
    @Param('wallet_address') wallet_address: string,
    @Param('contract_address') contract_address: string,
  ): Promise<any> {
    if (!wallet_address || !contract_address) {
      throw new HttpException('Incomplete address information', 400);
    }
    try {
      const balance = await this.walletService.getContractHoldings(
        wallet_address,
        contract_address,
      );
      const usdPrice = await this.api.getTokenPrice(contract_address);

      // futher enhancement to do: replace with library-specific response like express
      const amountInUsd = new BigNumber(balance).times(usdPrice).toFixed(2);
      return {
        holdings: balance,
        amountInUsd,
      };
    } catch (error) {
      throw new HttpException('Something went wrong with the api', 400);
    }
  }
}
