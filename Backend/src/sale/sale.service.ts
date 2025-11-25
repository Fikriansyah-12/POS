import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CheckoutSaleDto } from './dto/checkout-sale.dto';
import { PaymentStatus } from '@prisma/client';
import { PayService } from 'src/pay/pay.service';

@Injectable()
export class SaleService {
  constructor(
    private prisma: PrismaService,
    private midtransService: PayService,
  ) {}

  private async generateNoNota(): Promise<string> {
    const last = await this.prisma.sale.findFirst({
      orderBy: { id: 'desc' },
    });

    const nextNumber = (last?.id ?? 0) + 1;
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');

    return `SAL-${y}${m}${d}-${nextNumber.toString().padStart(4, '0')}`;
  }

  async checkout(dto: CheckoutSaleDto, userId: number) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Item tidak boleh kosong');
    }

    const productIds = dto.items.map((i) => i.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('Ada produk yang tidak ditemukan');
    }

    let total_bruto = 0;
    let total_diskon = 0;
    const salesDetailsData: {
      productId: number;
      quantity: number;
      harga_satuan: number;
      diskon_item: number;
      subTotal: number;
    }[] = [];

    for (const item of dto.items) {
      const product = products.find((p) => p.id === item.productId)!;

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Stok produk ${product.name} tidak mencukupi (stok: ${product.stock}, diminta: ${item.quantity})`,
        );
      }
      const harga_satuan = product.harga_jual;
      const diskon_item = item.diskon_item ?? 0;

      const subTotal = (harga_satuan - diskon_item) * item.quantity;

      total_bruto += harga_satuan * item.quantity;
      total_diskon += diskon_item * item.quantity;

      salesDetailsData.push({
        productId: item.productId,
        quantity: item.quantity,
        harga_satuan,
        diskon_item,
        subTotal,
      });
    }

    const total_bersih = total_bruto - total_diskon;

    const metode = await this.prisma.paymentMethod.findUnique({
      where: { id: dto.metodePembayaranId },
    });

    if (!metode) {
      throw new BadRequestException('Metode pembayaran tidak ditemukan');
    }

    const no_nota = await this.generateNoNota();

    const isMidtrans = metode.nameMetode.startsWith('MIDTRANS');

    const sale = await this.prisma.$transaction(async (tx) => {
      const createdSale = await tx.sale.create({
        data: {
          no_nota,
          userId,
          customerId: dto.customerId ?? null,
          metodePembayaranId: dto.metodePembayaranId,
          statusPembayaran: isMidtrans
            ? PaymentStatus.UNPAID
            : PaymentStatus.PAID,
          total_bruto,
          total_diskon,
          total_bersih,
          jumlah_bayar: isMidtrans ? 0 : total_bersih,
          kembalian: 0,
        },
      });

      for (const detail of salesDetailsData) {
        await tx.salesDetail.create({
          data: {
            saleId: createdSale.id,
            ...detail,
          },
        });

        await tx.product.update({
          where: { id: detail.productId },
          data: {
            stock: {
              decrement: detail.quantity,
            },
          },
        });
      }

      return createdSale;
    });

    if (!isMidtrans) {
      return {
        type: 'OFFLINE',
        sale,
      };
    }

    const midtransPayload = {
      transaction_details: {
        order_id: sale.no_nota,
        gross_amount: total_bersih,
      },
    };

    const midtransRes =
      await this.midtransService.createTransaction(midtransPayload);

    const updatedSale = await this.prisma.sale.update({
      where: { id: sale.id },
      data: {
        midtransOrderId: sale.no_nota,
        midtransTransactionId: midtransRes.transaction_id ?? null,
        midtransPaymentType: midtransRes.payment_type ?? null,
        midtransStatus: midtransRes.transaction_status ?? null,
        midtransSnapToken: midtransRes.token ?? null,
        midtransRawResponse: midtransRes,
      },
    });

    return {
      type: 'MIDTRANS',
      sale: updatedSale,
      snapToken: midtransRes.token,
      redirectUrl: midtransRes.redirect_url,
    };
  }
}
