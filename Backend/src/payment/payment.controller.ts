import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { createPaymentDto } from './dto/create-payment.dto';
import { PaymentMethod } from '@prisma/client';
import { paymentQueryDto } from './dto/payment-query.dto';
import { PaymentResponse } from './interface/payment.interface';
import { updatePayment } from './dto/update-payment.dto';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createPayment: createPaymentDto,
  ): Promise<ApiResponse<PaymentMethod>> {
    const newPaymentMethod =
      await this.paymentService.createPaymentMethod(createPayment);
    return {
      success: true,
      message: 'Payment Method Success Create',
      data: newPaymentMethod,
    };
  }

  @Get()
    @UseGuards(AuthGuard)
    async findAll(@Query() query: paymentQueryDto):Promise<PaymentResponse>{
      const result = await this.paymentService.findAll(query)
  
      return {
        success: true,
        message: 'Success all',
        ...result
      }
    }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: number): Promise<ApiResponse<PaymentMethod>> {
    const paymentId = await this.findOneOrFail(id);

    return {
      success: true,
      message: 'Payment success get detail',
      data: paymentId,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePayment:updatePayment):Promise<ApiResponse<PaymentMethod>>{
    const updatePayments = await this.paymentService.update(id,updatePayment)

    return {
      success: true,
      message: 'Success Update',
      data: updatePayments
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id',ParseIntPipe) id: number):Promise<{status: boolean; message:string;}>{
    await this.findOneOrFail(id)
    await this.paymentService.remove(id)

    return {
      status: true,
      message: 'Delete Success'
    }
  }

  private async findOneOrFail(id: number): Promise<PaymentMethod> {
    const payment = await this.paymentService.findOne(id);
    if (!payment) {
      throw new NotFoundException();
    }

    return payment;
  }
}
