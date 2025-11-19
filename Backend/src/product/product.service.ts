import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProductDto } from './dto/create-product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { nanoid } from 'nanoid';
import { productQueryDto } from './dto/product-query.dto';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createProduct: createProductDto, file?: Express.Multer.File) {
    let sku = createProduct.sku;
    let imageURL: string | undefined;

    if (file) {
      imageURL = await this.cloudinary.uploadImageStream(file);
    }

    if (!sku) {
      const random = nanoid(10).toUpperCase();
      sku = `PR${random}`;
    }
    const newProduct = await this.prisma.product.create({
      data: {
        name: createProduct.name,
        harga_beli: createProduct.harga_beli,
        harga_jual: createProduct.harga_jual,
        sku,
        stock: createProduct.stock,
        satuan: createProduct.satuan,
        expiredAt: createProduct.expiredAt
          ? new Date(createProduct.expiredAt)
          : null,
        categoryId: createProduct.categoryId,
        supplierId: createProduct.supplierId ?? null,
        image: imageURL,
      },
    });
    return newProduct;
  }

  async findAll(query: productQueryDto) {
    const {
      name,
      id,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }
    const allowedSortFields: (keyof Product)[] = [
      'id',
      'name',
      'harga_beli',
      'harga_jual',
      'stock',
      'sku',
      'createdAt',
      'updatedAt',
    ];
    const sortField: keyof Product = allowedSortFields.includes(
      sortBy as keyof Product,
    )
      ? (sortBy as keyof Product)
      : 'id';

    const sortDirection: Prisma.SortOrder =
      sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortField]: sortDirection,
        },
        include: {
          category: true,
          supplier: true,
        },
        // select: {
        //   id: true,
        //   name: true,
        //   image: true,
        //   harga_beli: true,
        //   harga_jual: true,
        //   sku: true,
        //   stock: true,
        //   satuan: true,
        //   is_active: true,
        //   expiredAt: true,
        //   categoryId: true,
        //   supplierId: true,
        //   createdAt: true,
        //   updatedAt: true,
        // },
      }),
      this.prisma.product.count({ where }),
    ]);
    const lastPage = Math.ceil(total / limit);
    return {
      data,
      total,
      page,
      lastPage,
    };
  }
}
