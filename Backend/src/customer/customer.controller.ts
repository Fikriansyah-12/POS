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
import { CustomerService } from './customer.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { customerDto } from './dto/create-customer.dto';
import { Customer } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { customerQueryDto } from './dto/customer-query.dto';
import { CustomerResponse } from './interface/customer.interface';
import { updateCustomerDto } from './dto/update-customer.dto';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createCustomerDto: customerDto,
  ): Promise<ApiResponse<Customer>> {
    const newCustomer =
      await this.customerService.newCustomer(createCustomerDto);
    return {
      success: true,
      message: 'Success',
      data: newCustomer,
    };
  }

  @Get()
  @UseGuards(AuthService)
  async findAll(@Query() query: customerQueryDto): Promise<CustomerResponse> {
    const result = await this.customerService.findAll(query);

    return {
      success: true,
      message: ' Success ',
      ...result,
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: number): Promise<ApiResponse<Customer>> {
    const customerId = await this.findOneOrFail(id);

    return {
      success: true,
      message: 'success',
      data: customerId,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto:updateCustomerDto
  ):Promise<ApiResponse<Customer>>{
    const updateCustomer = await this.customerService.update(id,updateCustomerDto)

    return {
      success: true,
      message: 'success',
      data: updateCustomer
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id',ParseIntPipe) id: number):Promise<{status: boolean; message: string}>{
    await this.findOneOrFail(id)
    await this.customerService.remove(id)

    return {
      status: true,
      message: 'success delete'
    }
  }

  private async findOneOrFail(id: number): Promise<Customer> {
    const customer = await this.customerService.findOne(id);
    if (!customer) {
      throw new NotFoundException();
    }

    return customer;
  }
}
