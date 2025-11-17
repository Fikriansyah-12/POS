import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryDto } from './dto/create-category.dto';
import { Category } from '@prisma/client';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decolator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/auth/guard/role.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(
    @Req() req,
    @Body() createCategoryDto: categoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll():Promise<Category[]> {
    return await this.categoryService.findAll()
  }
}
