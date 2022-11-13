import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDataService } from './order-data.service';
import { OrderRepository } from './db/order.repository';
import { OrdersController } from './orders.controller';
import { OrderProductRepository } from './db/orderProduct.repository';
import { ProductRepository } from 'src/products/db/product.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    OrderDataService,
    OrderRepository,
    OrderProductRepository,
    ProductRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([OrderRepository, OrderProductRepository]),
  ],
})
export class OrderModule {}
