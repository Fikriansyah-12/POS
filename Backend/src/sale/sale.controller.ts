import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CheckoutSaleDto } from './dto/checkout-sale.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('sales')
@UseGuards(AuthGuard)
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('checkout')
  async checkout(@Body() dto: CheckoutSaleDto, @Request() req) {
    const userId = req.user.id; 
    return this.saleService.checkout(dto, userId);
  }
}
