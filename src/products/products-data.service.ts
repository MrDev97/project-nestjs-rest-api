import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsDataService {
  private products: Array<Product> = [];

  addProduct(newProduct: CreateProductDto): Product {
    const savedProduct = {
      ...newProduct,
      id: uuidv4(),
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
    const product = this.getProductById(id);

    if (product) {
      return {
        ...product,
        ...dto,
        id: product.id,
        createdAt: product.createdAt,
        updatedAt: new Date(),
      };
    }
  }

  getProductById(id: string): Product {
    return this.products.find((i) => i.id === id);
  }

  getAllProducts(): Array<Product> {
    return this.products;
  }
}
