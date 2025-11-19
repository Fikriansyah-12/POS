import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { SupplierModule } from './supplier/supplier.module';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
    AuthModule,
    CategoryModule,
    SupplierModule,
    ProductModule,
    CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
