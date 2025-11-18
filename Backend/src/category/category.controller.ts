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
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryDto } from './dto/create-category.dto';
import { Category } from '@prisma/client';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decolator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { findOneParams } from './dto/find-one.params.dto';
import { updateCategoryDto } from './dto/update-category.dto';
import { categoryQueryDto } from './dto/category-query.dto';
import { CategoryListResponse } from './interface/category.interface';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(
    @Req() req,
    @Body() createCategoryDto: categoryDto,
  ): Promise<ApiResponse<Category>> {
    const newCategory = await this.categoryService.create(createCategoryDto);

    return {
      success: true,
      message: 'Category success create',
      data: newCategory,
    };
  }

@Get()
@UseGuards(AuthGuard)
async findAll(
  @Query() query: categoryQueryDto,
): Promise<CategoryListResponse> {
  const result = await this.categoryService.findAll(query);

  return {
    success: true,
    message: 'Category list',
    ...result,
  };
}

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: number): Promise<ApiResponse<Category>> {
    const categoryId = await this.findOneOrFail(id);
    return {
      success: true,
      message: 'Category success get',
      data: categoryId,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto:updateCategoryDto):Promise<ApiResponse<Category>>{
    const updated = await this.categoryService.update(id, updateCategoryDto);
    return {
        success: true,
        message: 'Category success update',
        data: updated
    }

  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id',ParseIntPipe) id: number,
  ): Promise<{ status: boolean; message: string }> {
    await this.findOneOrFail(id)
    await this.categoryService.remove(id);
    
    return {
      status: true,
      message: 'Category success delete',
    };
  }

  private async findOneOrFail(id: number): Promise<Category> {
    const category = await this.categoryService.findOne(id);
    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }
}
