import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import shortid from 'shortid';

@Injectable()
export class ProductsDataService {
  private products: Array<Product> = [];

  addProduct(newProduct: CreateProductDto): Product {
    const savedProduct = {
      ...newProduct,
      id: shortid.generate(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.products.push(savedProduct);
    return savedProduct;
  }

  deleteProduct(id: string): void {
    this.products.filter((i) => i.id === id);
  }

  updateProduct(id: string, dto: UpdateProductDto): Product {
    this.products.map((dto) =>
      dto.id === id
        ? {
            ...dto,
            id: dto.id,
            createdAt: dto.createdAt,
            updatedAt: new Date(),
          }
        : dto,
    );
  }

  getProductById(id: string): Product {
    return this.products.find((i) => i.id === id);
  }

  getAllProducts(): Array<Product> {
    return this.products;
  }
}
