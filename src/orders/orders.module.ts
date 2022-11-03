import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './db/order.entity';
import { OrdersDataService } from './orders-data.service';
import { OrderRepository } from './db/order.repository';

@Module({
  controllers: [OrderModule],
  providers: [OrdersDataService, OrderRepository],
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrderModule {}
