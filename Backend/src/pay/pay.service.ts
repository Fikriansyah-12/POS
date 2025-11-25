import { Injectable } from '@nestjs/common';
const midtransClient = require('midtrans-client');

@Injectable()
export class PayService {
  private snap: any;

  constructor() {
    const isProd = process.env.MIDTRANS_IS_PRODUCTION === 'true';

    console.log('MIDTRANS_IS_PRODUCTION =', process.env.MIDTRANS_IS_PRODUCTION);
    console.log('Using isProduction =', isProd);

    this.snap = new midtransClient.Snap({
      isProduction: isProd, 
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });
  }

  async createTransaction(payload: any) {
    return this.snap.createTransaction(payload);
  }
}
