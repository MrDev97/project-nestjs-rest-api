import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { ProductsDataService } from './products-data.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { dateToArray } from 'src/shared/date.helper';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get(':id')
  getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.getProductById(id));
  }

  @Get()
  getAllProducts(): Array<Product> {
    return this.productRepository.getAllProducts();
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

  @Delete(':id') @HttpCode(204) deleteProduct(@Param('id') _id_: string): void {
    this.productRepository.deleteProduct(_id_);
  }

  @Put(':id')
  updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() product: UpdateProductDto,
  ): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.updateProduct(id, product),
    );
  }
}
