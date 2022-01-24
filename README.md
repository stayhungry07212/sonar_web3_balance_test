
## Description

API ENDPOINTL 
```bash
localhost:3000/{wallet_address}/{contract_address}
```
Moralis Speedy Node is used for a web3 provider to get token balance and regarding decimals.
As for bscscan api, they need a paid tier for getting exact token prices.
I checked poocoin and pancakeswap how they calculate the price. As I see they call continously the bsc-dataseed through web3.js, but I didn't find the solution yet.
Bitquery provide delayed price.
So I decided to use Moralis web3 api.
Web3 has no concept of token value, as the value is speculative and differs between different markets.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
