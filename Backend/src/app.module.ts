import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { SupplierModule } from './supplier/supplier.module';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CustomerModule } from './customer/customer.module';
import { PaymentModule } from './payment/payment.module';
import { SaleModule } from './sale/sale.module';
import { PayService } from './pay/pay.service';
import { PayModule } from './pay/pay.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
    AuthModule,
    CategoryModule,
    SupplierModule,
    ProductModule,
    CloudinaryModule,
    CustomerModule,
    PaymentModule,
    SaleModule,
    PayModule],
  controllers: [AppController],
  providers: [AppService, PayService],
})
export class AppModule {}
