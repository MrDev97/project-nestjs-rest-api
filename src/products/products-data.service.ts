import { Injectable } from '@nestjs/common';
import { Product } from './db/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './db/product.repository';
import { TagRepository } from './db/tag.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductsDataService {
  constructor(
    private productRepository: ProductRepository,
    private tagRepository: TagRepository,
    private dataSource: DataSource,
  ) {}

  async addProduct(item: CreateProductDto): Promise<Product> {
    return await this.dataSource.transaction(async () => {
      const productToSave = new Product();

      productToSave.name = item.name;
      productToSave.price = item.price;
      productToSave.count = item.count;
      productToSave.tags = await this.tagRepository.findTagsByName(item.tags);

      return await this.productRepository.save(productToSave);
    });
  }

  async deleteProduct(productId: string): Promise<void> {
    this.productRepository.delete(productId);
  }

  async updateProduct(
    productId: string,
    item: UpdateProductDto,
  ): Promise<Product> {
    return await this.dataSource.transaction(async () => {
      const productToUpdate = await this.getProductById(productId);

      productToUpdate.name = item.name;
      productToUpdate.price = item.price;
      productToUpdate.count = item.count;
      productToUpdate.tags = await this.tagRepository.findTagsByName(item.tags);

      await this.productRepository.save(productToUpdate);

      return this.getProductById(productId);
    });
  }

  getProductById(productId: string): Promise<Product> {
    return this.productRepository.findOne({ where: { productId } });
  }

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
