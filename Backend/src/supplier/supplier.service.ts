import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { supplierDto } from './dto/create-supplier.dto';
import { Prisma, Supplier } from '@prisma/client';
import { updateSupplierDto } from './dto/update-supplier.dro';
import { supplierQueryDto } from './dto/supplier-query.dto';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  async create(createSupplierDto: supplierDto): Promise<Supplier> {
    const newSupplier = await this.prisma.supplier.create({
      data: {
        name: createSupplierDto.name,
        email: createSupplierDto.email,
        no_hp: createSupplierDto.no_hp,
      },
    });
    return newSupplier;
  }

async findAll(query: supplierQueryDto) {
  const {
    name,
    page = 1,
    limit = 10,
    sortBy = 'id',
    sortOrder = 'asc', 
  } = query;

  const skip = (page - 1) * limit;

  const where: Prisma.SupplierWhereInput = {};

  if (name) {
    where.name = {
      contains: name,
      mode: 'insensitive',
    };
  }

  const allowedSortFields: (keyof Supplier)[] = ['id', 'name', 'email', 'no_hp'];

  const sortField: keyof Supplier =
    allowedSortFields.includes(sortBy as keyof Supplier)
      ? (sortBy as keyof Supplier)
      : 'id';

  const sortDirection: Prisma.SortOrder =
    sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';

  const [data, total] = await this.prisma.$transaction([
    this.prisma.supplier.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortField]: sortDirection,
      },
      select: {
        id: true,
        name: true,
        email: true,
        no_hp: true,
      },
    }),
    this.prisma.supplier.count({ where }),
  ]);

  const lastPage = Math.ceil(total / limit);

  return {
    data,
    total,
    page,
    lastPage,
  };
}



  async findOne(id: number): Promise<Supplier | null> {
    return await this.prisma.supplier.findUnique({ where: { id } });
  }

  async update(id: number, updateSupplierDto: updateSupplierDto):Promise<Supplier>{
    return this.prisma.supplier.update({
      where: {id},
      data: {
        name: updateSupplierDto.name,
        email: updateSupplierDto.email,
        no_hp: updateSupplierDto.no_hp
      }
    })
  }

  async remove(id: number): Promise<void> {
    await this.prisma.supplier.delete({ where: { id } });
  }
}
