import {
  Body,
  Controller,
  Get,
  Post,
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
    const newProduct = await this.productService.create(createProductDto,file)
    return {
      success: true,
      message: 'Success',
      data: newProduct,
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query() query:productQueryDto):Promise<ProductListResponse>{
    const result = await this.productService.findAll(query)
    return {
      success: true,
      message: 'success',
      ...result
    }
  }
}
