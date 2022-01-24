import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import BigNumber from 'bignumber.js';

@Injectable()
export class AppService {
  constructor(private readonly http: HttpService) {}

  async getWalletHolding(
    wallet_address: string,
    contract_address: string,
  ): Promise<string> {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.NODE_URL),
    );
    console.log(process.env.NODE_URL);
    const minABI = [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            name: '',
            type: 'uint8',
          },
        ],
        payable: false,
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            name: 'balance',
            type: 'uint256',
          },
        ],
        payable: false,
        type: 'function',
      },
    ];
    const contract = new web3.eth.Contract(
      minABI as AbiItem[],
      contract_address,
    );

    try {
      // get decimals and balance
      const decimals = await contract.methods.decimals().call();
      const wallet_balance = await contract.methods
        .balanceOf(wallet_address)
        .call();

      // Big number calculations
      const balanceBN = new BigNumber(wallet_balance);
      const divisorBN = new BigNumber('10').pow(new BigNumber(decimals));
      const adjustedBalance = balanceBN.div(divisorBN).toFixed(+decimals);

      return adjustedBalance;
    } catch (error) {
      throw new HttpException(
        'Something went wrong with the contract method',
        404,
      );
    }
  }

  async getTokenPrice(contract_address): Promise<number> {
    const config = { 'x-api-key': process.env.MORALIS_API_KEY };

    try {
      const {
        status,
        data: { usdPrice },
      } = await this.http
        .get(
          process.env.MORALIS_API_ENDPOINT +
            contract_address +
            '/price?chain=bsc',
          {
            headers: config,
          },
        )
        .toPromise();
      if (status === 200) {
        return usdPrice;
      } else {
        return 0;
      }
    } catch (error) {
      throw new HttpException(
        'Something went wrong with moralis web3 api call',
        404,
      );
    }
  }
}
