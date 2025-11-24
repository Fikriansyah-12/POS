import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decolator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { supplierDto } from './dto/create-supplier.dto';
import { Supplier } from '@prisma/client';
import { supplierQueryDto } from './dto/supplier-query.dto';
import { SupplierResponse } from './interface/supplier.interface';
import { updateSupplierDto } from './dto/update-supplier.dro';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Controller('supplier')
export class SupplierController {
  constructor(
  private readonly supplierService:SupplierService
){}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body() createSupplierDto:supplierDto):Promise<ApiResponse<Supplier>>{
    const newSupplier = await this.supplierService.create(createSupplierDto)
    return {
      success: true,
      message: 'Supplier success create',
      data: newSupplier
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query() query: supplierQueryDto):Promise<SupplierResponse>{
    const result = await this.supplierService.findAll(query)

    return {
      success: true,
      message: 'Success all supplier',
      ...result
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: number):Promise<ApiResponse<Supplier>>{
    const supplierId = await this.findOneOrFail(id)
    return {
      success: true,
      message: 'Supplier succes get detail',
      data: supplierId
    }
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateSupplierDto:updateSupplierDto):Promise<ApiResponse<Supplier>>{
    const updateSupplier = await this.supplierService.update(id,updateSupplierDto)

    return {
      success: true,
      message: 'Supplier success update',
      data: updateSupplier
    }
  }
 
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{status: boolean; message: string}>{
    await this.findOneOrFail(id)
    await this.supplierService.remove(id)

    return {
      status: true,
      message: 'Supplier Delete'
    }
  }

    private async findOneOrFail(id: number): Promise<Supplier> {
      const supplier = await this.supplierService.findOne(id);
      if (!supplier) {
        throw new NotFoundException();
      }
  
      return supplier;
    }
}
