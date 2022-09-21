import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';

@Controller('products')
export class ProductsController {
  @Get(':id') getProductById(@Param('id') _id_: string): string {
    return `GetByID ${_id_}`;
  }
  @Post()
  addIProduct(@Body() _product_: CreateProductDto): ExternalProductDto {
    return null;
  }
}
