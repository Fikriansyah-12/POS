import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { customerDto } from './dto/create-customer.dto';
import { Customer, Prisma } from '@prisma/client';
import { updateCustomerDto } from './dto/update-customer.dto';
import { customerQueryDto } from './dto/customer-query.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async newCustomer(createCustomerDto: customerDto) {
    const create = await this.prisma.customer.create({
      data: {
        name: createCustomerDto.name,
        email: createCustomerDto.email,
        noHp: createCustomerDto.noHp,
      },
    });
    console.log(create);
    return create;
    
  }

  async findAll(query: customerQueryDto) {
    const {
      name,
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'asc',
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.CustomerWhereInput = {};

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    const allowedSortFields: (keyof Customer)[] = [
      'id',
      'name',
      'email',
      'noHp',
    ];

    const sortField: keyof Customer = allowedSortFields.includes(
      sortBy as keyof Customer,
    )
      ? (sortBy as keyof Customer)
      : 'id';

    const sortDirection: Prisma.SortOrder =
      sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';
    const [data, total] = await this.prisma.$transaction([
      this.prisma.customer.findMany({
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
          noHp: true,
        },
      }),
      this.prisma.customer.count({ where }),
    ]);
    const lastPage = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      lastPage,
    };
  }

  async findOne(id: number): Promise<Customer | null> {
    return await this.prisma.customer.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateCustomerDto: updateCustomerDto,
  ): Promise<Customer> {
    return await this.prisma.customer.update({
      where: { id },
      data: {
        name: updateCustomerDto.name,
        email: updateCustomerDto.email,
        noHp: updateCustomerDto.noHp,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.customer.delete({ where: { id } });
  }
}
