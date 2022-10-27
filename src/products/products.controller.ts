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
  UseGuards,
} from '@nestjs/common';
import { Product } from './db/product.entity';
import { ProductsDataService } from './products-data.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { dateToArray } from 'src/shared/date.helper';
import { RoleGuard } from 'src/shared/guards/role.guard';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsDataService) {}

  @Get(':id')
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productService.getProductById(id),
    );
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @UseGuards(RoleGuard)
  @Post()
  async addProduct(
    @Body() item: CreateProductDto,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productService.addProduct(item),
    );
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
      tags: product.tags?.map((i) => i.name),
    };
  }

  @Delete(':id') @HttpCode(204) deleteProduct(@Param('id') _id_: string): void {
    this.productService.deleteProduct(_id_);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() product: UpdateProductDto,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productService.updateProduct(id, product),
    );
  }
}
