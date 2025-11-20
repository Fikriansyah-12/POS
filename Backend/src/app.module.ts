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
    PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
