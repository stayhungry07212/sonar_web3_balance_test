[1mdiff --git a/src/app.controller.ts b/src/app.controller.ts[m
[1mindex 4a9687a..1448b7d 100644[m
[1m--- a/src/app.controller.ts[m
[1m+++ b/src/app.controller.ts[m
[36m@@ -1,6 +1,7 @@[m
 import { Controller, Get, Param, HttpException } from '@nestjs/common';[m
 import { WalletService } from './wallet.service';[m
 import { ApiService } from './api.service';[m
[32m+[m[32mimport { BigNumber } from 'bignumber.js';[m
 [m
 @Controller()[m
 export class AppController {[m
[36m@@ -25,9 +26,10 @@[m [mexport class AppController {[m
       const usdPrice = await this.api.getTokenPrice(contract_address);[m
 [m
       // futher enhancement to do: replace with library-specific response like express[m
[32m+[m[32m      const amountInUsd = new BigNumber(balance).times(usdPrice).toFixed(2);[m
       return {[m
[31m-        holdings: +balance,[m
[31m-        amountInUsd: usdPrice * +balance,[m
[32m+[m[32m        holdings: balance,[m
[32m+[m[32m        amountInUsd,[m
       };[m
     } catch (error) {[m
       return error;[m
