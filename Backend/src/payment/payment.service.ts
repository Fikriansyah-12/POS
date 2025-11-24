import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as midtransClient from 'midtrans-client';
import { createPaymentDto } from './dto/create-payment.dto';
import { PaymentMethod, Prisma } from '@prisma/client';
import { updatePayment } from './dto/update-payment.dto';
import { paymentQueryDto } from './dto/payment-query.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}
  async createPaymentMethod(createPaymentDto: createPaymentDto) {
    const newPayment = await this.prisma.paymentMethod.create({
      data: {
        nameMetode: createPaymentDto.nameMetode,
        Keterangan: createPaymentDto.Keterangan,
      },
    });
    return newPayment;
  }

  async findAll(query: paymentQueryDto) {
    const {
      name,
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'asc',
    } = query;

    const skip = (page - 1) * limit;

  const where: Prisma.PaymentMethodWhereInput = {};

    if (name) {
      where.nameMetode = {
        contains: name,
        mode: 'insensitive',
      };
    }

    const allowedSortFields: (keyof PaymentMethod)[] = [
      'id',
      'nameMetode',
      'Keterangan',
    ];

    const sortField: keyof PaymentMethod = allowedSortFields.includes(
      sortBy as keyof PaymentMethod,
    )
      ? (sortBy as keyof PaymentMethod)
      : 'id';

    const sortDirection: Prisma.SortOrder =
      sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';
    const [data, total] = await this.prisma.$transaction([
      this.prisma.paymentMethod.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortField]: sortDirection,
        },
        select: {
          id: true,
          nameMetode: true,
          Keterangan: true,
        },
      }),
      this.prisma.paymentMethod.count({ where }),
    ]);
    const lastPage = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      lastPage,
    };
  }

  async findOne(id: number): Promise<PaymentMethod | null> {
    return await this.prisma.paymentMethod.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updatePayementDto: updatePayment,
  ): Promise<PaymentMethod> {
    return await this.prisma.paymentMethod.update({
      where: { id },
      data: {
        nameMetode: updatePayementDto.nameMetode,
        Keterangan: updatePayementDto.Keterangan,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.paymentMethod.delete({ where: { id } });
  }
}
