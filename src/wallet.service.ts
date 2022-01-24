import { Injectable } from '@nestjs/common';
import BigNumber from 'bignumber.js';

import { ApiService } from './api.service';

interface Balance {
  balance: string;
  decimals: string;
}

@Injectable()
export class WalletService {
  constructor(private apiService: ApiService) {}

  async getContractHoldings(
    wallet_address: string,
    contract_address: string,
  ): Promise<string> {
    const { balance, decimals }: Balance = await this.apiService.getBalance(
      wallet_address,
      contract_address,
    );

    // Big number calculations
    const balanceBN = new BigNumber(balance);
    const divisorBN = new BigNumber('10').pow(new BigNumber(decimals));
    const adjustedBalance = balanceBN.div(divisorBN).toFixed(+decimals);

    return adjustedBalance;
  }
}
