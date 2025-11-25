import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { PayModule } from 'src/pay/pay.module';

@Module({
  imports: [PrismaModule,AuthModule,PayModule],
  providers: [SaleService],
  controllers: [SaleController]
})
export class SaleModule {}
