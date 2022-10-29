import { Injectable } from '@nestjs/common';
import { Product } from './db/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './db/product.repository';
import { TagRepository } from './db/tag.repository';
import { Tag } from './db/tag.entity';

@Injectable()
export class ProductsDataService {
  constructor(
    private productRepository: ProductRepository,
    private tagRepository: TagRepository,
  ) {}

  async addProduct(item: CreateProductDto): Promise<Product> {
    const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);
    const productToSave = new Product();

    productToSave.name = item.name;
    productToSave.price = item.price;
    productToSave.count = item.count;
    productToSave.tags = tags;

    return await this.productRepository.save(productToSave);
  }

  async deleteProduct(productId: string): Promise<void> {
    this.productRepository.delete(productId);
  }

  async updateProduct(
    productId: string,
    item: UpdateProductDto,
  ): Promise<Product> {
    const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);
    const productToUpdate = await this.getProductById(productId);

    productToUpdate.name = item.name;
    productToUpdate.price = item.price;
    productToUpdate.count = item.count;
    productToUpdate.tags = tags;

    await this.productRepository.save(productToUpdate);

    return this.getProductById(productId);
  }

  getProductById(productId: string): Promise<Product> {
    return this.productRepository.findOne({ where: { productId } });
  }

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
