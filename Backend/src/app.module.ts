import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
    AuthModule,
    CategoryModule,
    SupplierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
