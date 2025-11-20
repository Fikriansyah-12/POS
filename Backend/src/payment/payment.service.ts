import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as midtransClient from 'midtrans-client'
import { createPaymentDto } from './dto/create-payment.dto';
import { PaymentMethod } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService
  ){}
  async createPaymentMethod(createPaymentDto: createPaymentDto){
    const newPayment = await this.prisma.paymentMethod.create({
      data: {
        nameMetode: createPaymentDto.nameMetode,
        Keterangan: createPaymentDto.keterangan
      }
    })
    return newPayment
  }

  async findOne(id: number):Promise<PaymentMethod|null>{
    return await this.prisma.paymentMethod.findUnique({where: {id}})
  }
}
