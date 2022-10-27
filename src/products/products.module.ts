import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsDataService } from './products-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './db/tag.repository';
import { ProductRepository } from './db/product.repository';
import { Product } from './db/product.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsDataService, TagRepository, ProductRepository],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
