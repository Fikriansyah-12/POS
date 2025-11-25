import { Injectable } from '@nestjs/common';

const midtransClient = require('midtrans-client');

@Injectable()
export class PayService {
  private snap: any

  constructor(){
    this.snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'false',
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });
  }
  async createTransaction(payload: any){
    return this.snap.createTransaction(payload)
  }
}
