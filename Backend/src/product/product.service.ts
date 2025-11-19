import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProductDto } from './dto/create-product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { nanoid } from 'nanoid';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createProduct: createProductDto, file?: Express.Multer.File) {
    let sku = createProduct.sku;
    let imageURL: string | undefined

    if (file) {
      imageURL = await this.cloudinary.uploadImageStream(file)
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
        image: imageURL
      },
    });
    return newProduct;
  }
}
