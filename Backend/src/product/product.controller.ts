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
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decolator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { createProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { productQueryDto } from './dto/product-query.dto';
import { ProductListResponse } from './interface/product.interface';
import { updateProductDto } from './dto/update-product.dto';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: createProductDto,
  ): Promise<ApiResponse<Product>> {
    const newProduct = await this.productService.create(createProductDto, file);
    return {
      success: true,
      message: 'Success',
      data: newProduct,
    };
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query() query: productQueryDto): Promise<ProductListResponse> {
    const result = await this.productService.findAll(query);
    return {
      success: true,
      message: 'success',
      ...result,
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Product>> {
    const productId = await this.findOneOrFail(id);
    return {
      success: true,
      message: 'Succcess get one data product',
      data: productId,
    };
  }

    @Put(":id")
    @UseGuards(AuthGuard)
      @UseInterceptors(FileInterceptor('image'))
    async update(
      @Param('id',ParseIntPipe) id: number, 
      @Body() updateProductDto:updateProductDto,
        @UploadedFile() file: Express.Multer.File,
  ):Promise<ApiResponse<Product>>{
      const productService = await this.productService.update(id,updateProductDto,file)
  
      return {
        success: true,
        message: 'Supplier success update',
        data: productService
      }
    }
    
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ status: boolean; message: string }> {
    await this.findOneOrFail(id);
    await this.productService.remove(id);

    return {
      status: true,
      message: 'Product has been delete',
    };
  }

  private async findOneOrFail(id: number): Promise<Product> {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
