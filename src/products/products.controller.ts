import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get(':id') getProductById(@Param('id') _id_: string): string {
    return `GetByID ${_id_}`;
  }
}
