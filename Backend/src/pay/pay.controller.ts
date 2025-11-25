import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PaymentStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('pay')
export class PayController {
  constructor(private prisma: PrismaService) {}

  @Post('webhook')
  @HttpCode(200)
  async handlewebHook(@Body() body: any) {
    const { order_id, transaction_status, transaction_id, payment_type } = body;

    const sale = await this.prisma.sale.findFirst({
      where: {
        midtransOrderId: order_id,
      },
    });

    if (!sale) {
      return { status: 'ok' };
    }

    let statusPembayaran: PaymentStatus = PaymentStatus.UNPAID;

    if (transaction_status === 'settlement') {
      statusPembayaran = PaymentStatus.PAID;
    } else if (
      transaction_status === 'cancel' ||
      transaction_status === 'expire' ||
      transaction_status === 'deny'
    ) {
      statusPembayaran = PaymentStatus.CANCELLED;
    }
     await this.prisma.sale.update({
      where: { id: sale.id },
      data: {
        midtransStatus: transaction_status,
        midtransTransactionId: transaction_id,
        midtransPaymentType: payment_type,
        statusPembayaran,
        jumlah_bayar:
          transaction_status === 'settlement'
            ? sale.total_bersih
            : sale.jumlah_bayar,
      },
    });

    return { status: 'ok' };
  }
}
