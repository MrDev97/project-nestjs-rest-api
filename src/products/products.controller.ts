import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { ProductsDataService } from './products-data.service';
import { dateToArray } from 'src/shared/date.helper';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get(':id') getProductById(@Param('id') _id_: string): string {
    return `GetByID ${_id_}`;
  }

  @Post()
  addProduct(@Body() item: CreateProductDto): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.addProduct(item));
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }
}
