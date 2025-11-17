import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { categoryDto } from './dto/create-category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: categoryDto): Promise<Category> {
    const newCategory = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        deskripsi: createCategoryDto.desc,
      },
    });

    return newCategory;
  }

  async findAll() {
    return await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        deskripsi: true,
      },
    });
  }
}
