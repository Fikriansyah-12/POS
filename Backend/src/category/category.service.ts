import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { categoryDto } from './dto/create-category.dto';
import { Category, Prisma } from '@prisma/client';
import { updateCategoryDto } from './dto/update-category.dto';
import { categoryQueryDto } from './dto/category-query.dto';

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

  async findAll(query: categoryQueryDto) {
     const {
      name,
      page = 1,
      limit = 3,
      sortBy = 'createAt',
      sortOrder = 'desc',
    } = query;

        const skip = (page - 1) * limit;
    const where: Prisma.CategoryWhereInput = {};

     if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }
    
    const allowedSortFields: (keyof Category)[] = [
      'id',
      'name',
    ];
    
    const sortField: keyof Category =
      allowedSortFields.includes(sortBy as keyof Category)
        ? (sortBy as keyof Category)
        : 'id';
    
      const sortDirection: Prisma.SortOrder =
      sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';

  const [data, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortField]: sortDirection,
        },
        select: {
          id: true,
          name: true,
          deskripsi: true,
        },
      }),
      this.prisma.category.count({ where }),
    ]);

    const lastPage = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      lastPage,
    };
  }

  async findOne(id: number):Promise<Category | null>{
    return await this.prisma.category.findUnique({where: {id}})
  } 

  async update(id: number, updateCategoryDto:updateCategoryDto):Promise<Category>{
    return this.prisma.category.update({
      where: {id},
      data: {
        name: updateCategoryDto.name,
        deskripsi: updateCategoryDto.desc
      }
    })
  }

  async remove(id: number):Promise<void>{
  await this.prisma.category.delete({where: {id}})
  }
}
